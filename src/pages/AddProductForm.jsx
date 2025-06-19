import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdOutlineFileOpen } from "react-icons/md";
import * as Yup from "yup";
import { toast } from "react-toastify";
import BaseApiManager from "../networking/baseAPIManager";
import { API_BASE_URL, API_ENDPOINTS } from "../networking/apiConfig";
import Table from "../components/common/Table";
import { Pencil } from "lucide-react";
import Loader from "../components/common/Loading";

const AddProductForm = () => {
    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [videoFile, setVideoFile] = useState(null);
    const [productData, setProductData] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await BaseApiManager.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
                setCategories(data);
            } catch {
                toast.error("Unable to fetch product categories.");
            }
        };
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await BaseApiManager.get(`${API_BASE_URL}${API_ENDPOINTS.GET_ALL_PRODUCTS}`);
            setProductData(data?.products || data || []);
        } catch {
            toast.error("Failed to fetch product data.");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        subDescription: Yup.string().required("Sub-description is required"),
        tag: Yup.string().required("Tag is required"),
        price: Yup.number().required("Price is required"),
        offerCode: Yup.string().required("Offer code is required"),
        rating: Yup.number().required("Rating is required").min(0).max(5),
        status: Yup.string().required("Status is required"),
        description: Yup.string().required("Description is required"),
        category: Yup.string().required("Category is required"),
    });

    const handleSubmit = async (values, { resetForm }) => {
        if (imageFiles.length < 2) {
            toast.error("Please upload at least 2 images.");
            return;
        }
        if (!videoFile) {
            toast.error("Please upload a product video.");
            return;
        }

        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // ✅ Append each image with key 'image'
        imageFiles.forEach((file) => {
            formData.append("image", file);
        });

        formData.append("video", videoFile);

        try {
            setLoading(true); // show loader
            await BaseApiManager.post(`${API_BASE_URL}${API_ENDPOINTS.ADD_PRODUCT}`, formData);
            toast.success("Product added successfully!");
            resetForm();
            setImageFiles([]);
            setVideoFile(null);
            fetchProducts();
        } catch (error) {
            toast.error("Failed to add product.");
        } finally {
            setLoading(false); // hide loader
        }
    };
    const updateProductStatus = async (productId, newStatus) => {
        try {
            const url = `${API_BASE_URL}${API_ENDPOINTS.UPDATE_PRODUCT_STATUS.replace(":id", productId)}`;
            await BaseApiManager.patch(url, { status: newStatus });
            toast.success(`Product status updated to ${newStatus}`);
            fetchProducts();
            setIsModalOpen(false);
        } catch (error) {
            toast.error("Failed to update product status.");
        }
    };

    const handleImageChange = async (productId, file) => {
        const formData = new FormData();
        formData.append("image", file);
        try {
            const url = `${API_BASE_URL}${API_ENDPOINTS.UPDATE_PRODUCT_IMAGE.replace(":id", productId)}`;
            await BaseApiManager.patch(url, formData);
            toast.success("Product image updated successfully.");
            fetchProducts();
        } catch (error) {
            toast.error("Failed to update product image.");
        }
    };

    const columns = [
        { Header: "Title", accessor: "title" },
        { Header: "Tag", accessor: "tag" },
        { Header: "Price", accessor: "price" },
        { Header: "Rating", accessor: "rating" },
        { Header: "Offer Code", accessor: "offerCode" },
        { Header: "Status", accessor: "status" },
        {
            Header: "Actions",
            accessor: "actions",
            Cell: ({ row }) => (
                <button
                    onClick={() => {
                        setSelectedProduct(row.original);
                        setIsModalOpen(true);
                    }}
                    className="bg-[#454545] text-white text-sm rounded-full px-6 py-2 w-[125px] h-[45px] flex items-center justify-center"
                >
                    View
                </button>
            ),
        },
    ];

    const ProductDetailModal = ({ product, onClose, handleStatusChange, handleImageChange }) => {
        const fileInputRef = useRef(null);
        if (!product) return null;

        const triggerFileInput = () => fileInputRef.current?.click();

        const onFileChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                handleImageChange(product._id, file);
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                <div className="bg-white p-6 md:p-8 rounded-2xl w-full max-w-lg shadow-lg relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-pink-600 text-2xl font-bold hover:text-pink-800"
                    >
                        ✕
                    </button>

                    <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                        Product Details
                    </h2>

                    <div className="relative mb-6">
                        {(product.image || product.imageUrls?.length > 0) && (
                            <img
                                src={product.image || product.imageUrls[0]}
                                alt="Product"
                                className="w-full h-64 object-cover rounded-xl border border-gray-200"
                            />
                        )}

                        <button
                            onClick={triggerFileInput}
                            className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
                            title="Change Image"
                        >
                            <Pencil className="w-5 h-5" />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={onFileChange}
                            className="hidden"
                        />
                    </div>


                    <div className="space-y-3 text-gray-700 text-base px-1">
                        <p><span className="font-semibold">Tag:</span> {product.tag}</p>
                        <p><span className="font-semibold">Title:</span> {product.title}</p>
                        <p><span className="font-semibold">Sub Description:</span> {product.subDescription}</p>
                        <p><span className="font-semibold">Price:</span> ₹{product.price}</p>
                        <p><span className="font-semibold">Offer Code:</span> {product.offerCode}</p>
                        <p><span className="font-semibold">Rating:</span> {product.rating}</p>
                        <p><span className="font-semibold">Status:</span> {product.status}</p>
                        <p><span className="font-semibold">Description:</span> {product.description}</p>
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={() => handleStatusChange(product._id, "Active")}
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
                        >
                            Active
                        </button>
                        <button
                            onClick={() => handleStatusChange(product._id, "Inactive")}
                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
                        >
                            Inactive
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="w-full p-6 bg-white rounded-2xl shadow-md">
                <h2 className="text-xl font-semibold mb-6">Add a New Product</h2>

                <Formik
                    initialValues={{
                        title: "",
                        subDescription: "",
                        tag: "",
                        price: "",
                        offerCode: "",
                        rating: "",
                        status: "",
                        description: "",
                        category: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Upload Images (min 2)</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        ref={imageInputRef}
                                        type="file"
                                        multiple
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => setImageFiles(Array.from(e.target.files))}
                                    />
                                    <input
                                        type="text"
                                        readOnly
                                        value={imageFiles.length > 0 ? `${imageFiles.length} image(s) selected` : ""}
                                        placeholder="No images selected"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => imageInputRef.current?.click()}
                                        className="p-3 bg-[#454545] text-white rounded-md hover:bg-gray-700"
                                    >
                                        <MdOutlineFileOpen className="text-2xl" />
                                    </button>
                                </div>
                            </div>

                            {/* Video Upload */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Upload Product Video</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        ref={videoInputRef}
                                        type="file"
                                        hidden
                                        accept="video/*"
                                        onChange={(e) => setVideoFile(e.target.files[0])}
                                    />
                                    <input
                                        type="text"
                                        readOnly
                                        value={videoFile?.name || ""}
                                        placeholder="No video selected"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => videoInputRef.current?.click()}
                                        className="p-3 bg-[#454545] text-white rounded-md hover:bg-gray-700"
                                    >
                                        <MdOutlineFileOpen className="text-2xl" />
                                    </button>
                                </div>
                            </div>

                            {/* Other fields */}
                            <div>
                                <label className="block text-sm mb-1 font-medium">Select Product Category</label>
                                <Field
                                    as="select"
                                    name="category"
                                    className="w-full px-4 py-2 border rounded-md bg-gray-100"
                                >
                                    <option value="">-- Choose Category --</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm mb-1 font-medium">Product Tag</label>
                                <Field
                                    name="tag"
                                    type="text"
                                    placeholder="e.g. FEATURED, TRENDING"
                                    className="w-full px-4 py-2 border rounded-md bg-gray-100"
                                />
                                <ErrorMessage name="tag" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm mb-1 font-medium">Product Name</label>
                                <Field
                                    name="title"
                                    type="text"
                                    placeholder="Enter product name"
                                    className="w-full px-4 py-2 border rounded-md bg-gray-100"
                                />
                                <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm mb-1 font-medium">Short Description</label>
                                <Field
                                    name="subDescription"
                                    type="text"
                                    placeholder="Short tagline or summary"
                                    className="w-full px-4 py-2 border rounded-md bg-gray-100"
                                />
                                <ErrorMessage name="subDescription" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm mb-1 font-medium">Product Price</label>
                                <Field
                                    name="price"
                                    type="number"
                                    placeholder="Enter price in ₹"
                                    className="w-full px-4 py-2 border rounded-md bg-gray-100"
                                />
                                <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm mb-1 font-medium">Discount Code</label>
                                <Field
                                    name="offerCode"
                                    type="text"
                                    placeholder="Enter offer code"
                                    className="w-full px-4 py-2 border rounded-md bg-gray-100"
                                />
                                <ErrorMessage name="offerCode" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm mb-1 font-medium">Customer Rating</label>
                                <Field
                                    name="rating"
                                    type="number"
                                    step="0.1"
                                    placeholder="Rate from 0 to 5"
                                    className="w-full px-4 py-2 border rounded-md bg-gray-100"
                                />
                                <ErrorMessage name="rating" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm mb-1 font-medium">Availability Status</label>
                                <Field
                                    as="select"
                                    name="status"
                                    className="w-full px-4 py-2 border rounded-md bg-gray-100"
                                >
                                    <option value="">-- Select Status --</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </Field>
                                <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm mb-1 font-medium">Full Product Description</label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    rows={4}
                                    placeholder="Write detailed product info here"
                                    className="w-full px-4 py-2 border rounded-md bg-gray-100"
                                />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="md:col-span-2 flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-gray-800 text-white py-2 px-6 rounded-xl hover:bg-gray-700"
                                >
                                    Submit Product
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            <div className="mt-8">
                <Table columns={columns} data={productData} title="All Products" />
            </div>

            {isModalOpen && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setIsModalOpen(false)}
                    handleStatusChange={updateProductStatus}
                    handleImageChange={handleImageChange}
                />
            )}

            {loading && <Loader />}
        </>
    );
};

export default AddProductForm;


