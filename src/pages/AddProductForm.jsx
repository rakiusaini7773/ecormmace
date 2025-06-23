import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import { MdOutlineFileOpen } from "react-icons/md";
import * as Yup from "yup";
import { toast } from "react-toastify";
import BaseApiManager from "../networking/baseAPIManager";
import { API_BASE_URL, API_ENDPOINTS } from "../networking/apiConfig";
import Loader from "../components/common/Loading";

const AddProductForm = () => {
    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [videoFile, setVideoFile] = useState(null);
    const [productData, setProductData] = useState([]);

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
        heading: Yup.string().required("Heading is required"),
        subHeading: Yup.string().required("Sub-heading is required"),
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
        const structuredFields = ['offers', 'usageRestrictions', 'usageLimits', 'helpsWith', 'ingredients'];

        Object.entries(values).forEach(([key, value]) => {
            if (structuredFields.includes(key)) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        });

        imageFiles.forEach((file) => {
            formData.append("image", file);
        });
        formData.append("video", videoFile);

        try {
            setLoading(true);
            await BaseApiManager.post(`${API_BASE_URL}${API_ENDPOINTS.ADD_PRODUCT}`, formData);
            toast.success("Product added successfully!");
            resetForm();
            setImageFiles([]);
            setVideoFile(null);
            fetchProducts();
        } catch (error) {
            toast.error("Failed to add product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
            <Formik
                initialValues={{
                    heading: '',
                    subHeading: '',
                    subDescription: '',
                    tag: '',
                    price: '',
                    offerCode: '',
                    rating: '',
                    status: '',
                    description: '',
                    category: '',
                    helpsWith: [{ icon: '', text: '' }],
                    ingredients: [{ name: '', type: '' }],
                    offers: { discountType: '', discountValue: '', couponType: '', expiryDate: '' },
                    usageRestrictions: { minSpend: '', products: [] },
                    usageLimits: { perCoupon: '', perUser: '' }
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleBlur }) => (
                    <Form className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-sm">Heading</label>
                            <input
                                name="heading"vcvcb    
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.heading}
                                placeholder="Enter product heading"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <ErrorMessage name="heading" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-sm">Sub Heading</label>
                            <input
                                name="subHeading"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.subHeading}
                                placeholder="Enter sub heading"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <ErrorMessage name="subHeading" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-sm">Sub Description</label>
                            <input
                                name="subDescription"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.subDescription}
                                placeholder="Enter sub description"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <ErrorMessage name="subDescription" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-sm">Tag</label>
                            <input
                                name="tag"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.tag}
                                placeholder="Enter tag"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <ErrorMessage name="tag" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-sm">Price</label>
                            <input
                                type="number"
                                name="price"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.price}
                                placeholder="Enter price"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-sm">Offer Code</label>
                            <input
                                name="offerCode"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.offerCode}
                                placeholder="Enter offer code"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <ErrorMessage name="offerCode" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-sm">Rating</label>
                            <input
                                type="number"
                                step="0.1"
                                name="rating"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.rating}
                                placeholder="Enter rating (0–5)"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <ErrorMessage name="rating" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-sm">Status</label>
                            <select
                                name="status"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.status}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            >
                                <option value="">-- Select Status --</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                            <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="md:col-span-2 mb-4">
                            <label className="block mb-1 font-medium text-sm">Description</label>
                            <textarea
                                name="description"
                                rows="4"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                placeholder="Enter product description"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-sm">Category</label>
                            <select
                                name="category"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.category}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            >
                                <option value="">-- Select Category --</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                            <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="md:col-span-2 text-right mt-4">
                            <button
                                type="submit"
                                className="bg-black text-white px-8 py-2 rounded-xl hover:bg-gray-800 transition"
                            >
                                Add Product
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

            {loading && <Loader />}
        </div>

    );
};

export default AddProductForm;
