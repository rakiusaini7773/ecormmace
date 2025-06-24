import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, FieldArray, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { MdOutlineFileOpen } from "react-icons/md";
import BaseApiManager from "../networking/baseAPIManager";
import { API_BASE_URL, API_ENDPOINTS } from "../networking/apiConfig";
import Loader from "../components/common/Loading";
import { MdDelete, MdAdd } from "react-icons/md";

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
        helpsWith: Yup.array().of(
            Yup.object().shape({
                icon: Yup.string().required("Icon is required"),
                text: Yup.string().required("Text is required")
            })
        ),
        ingredients: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required("Text is required"),
                type: Yup.string().required("Type is required")
            })
        )
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
                    offers: { discountType: '', discountValue: '', couponType: '', expiryDate: '' },
                    usageRestrictions: { minSpend: '', products: [] },
                    usageLimits: { perCoupon: '', perUser: '' },
                    for: [{ icon: '', text: '' }],
                    ingredientText: '',
                    forType: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleBlur }) => (
                    <Form className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Upload Icon Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Upload Image (min 2)
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="file"
                                    //   ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                //   onChange={(e) => setFile(e.target.files[0])}
                                />
                                <input
                                    type="text"
                                    readOnly
                                    //   value={file?.name || ""}
                                    placeholder="No file chosen"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                                />
                                <button
                                    type="button"
                                    //   onClick={handleUploadClick}
                                    className="p-3 bg-[#454545] text-white rounded-md hover:bg-gray-700"
                                    title="Upload"
                                >
                                    <MdOutlineFileOpen className="text-2xl" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Upload Video
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="file"
                                    ref={videoInputRef}
                                    className="hidden"
                                    accept="video/*"
                                    onChange={(e) => {
                                        // Handle video file
                                    }}
                                />
                                <input
                                    type="text"
                                    readOnly
                                    // value={selectedVideoFile?.name || ""}
                                    placeholder="No file chosen"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                                />
                                <button
                                    type="button"
                                    // onClick={handleVideoUploadClick}
                                    className="p-3 bg-[#454545] text-white rounded-md hover:bg-gray-700"
                                    title="Upload Video"
                                >
                                    <MdOutlineFileOpen className="text-2xl" />
                                </button>
                            </div>
                        </div>

                        {/* Basic Inputs (Heading to Category) */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-sm">Heading</label>
                            <input
                                name="heading"
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

                        {/* Helps With Section */}
                        <div className="md:col-span-2 mb-4">
                            <h2 className="text-lg font-semibold mb-2">Product Details</h2>

                            <FieldArray name="for">
                                {({ push, remove }) => (
                                    <>
                                        <div className="flex justify-between items-center mb-3">
                                            <label className="text-lg font-semibold mt-4">Helps With </label>
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => push({ icon: '', text: '' })}
                                                    className="text-white bg-black px-3 py-1.5 rounded hover:bg-gray-800 flex items-center gap-1 text-sm"
                                                >
                                                    <MdAdd className="text-lg" /> Add
                                                </button>
                                                {values.for.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(values.for.length - 1)}
                                                        className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                                                    >
                                                        <MdDelete className="text-xl" /> Remove
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {values.for.map((item, index) => (
                                            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                                {/* Icon Upload Input */}
                                                <div className="flex flex-col w-full">
                                                    <label className="text-sm mb-1">Icon Upload</label>
                                                    <div className="flex w-full">
                                                        <input
                                                            name={`for[${index}].icon`}
                                                            placeholder="e.g. https://image.url"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={item.icon}
                                                            className="w-full border px-4 py-2 rounded-md bg-gray-100"
                                                        />
                                                        <button
                                                            type="button"
                                                            title="Upload"
                                                            className="ml-2 px-3 bg-gray-800 text-white rounded-md"
                                                            onClick={() => {
                                                                alert('Upload icon logic here');
                                                            }}
                                                        >
                                                            <MdOutlineFileOpen />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Text Input */}
                                                <div className="flex flex-col w-full relative">
                                                    <label className="text-sm mb-1">Text</label>
                                                    <input
                                                        name={`for[${index}].text`}
                                                        placeholder="e.g. For all skin types"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={item.text}
                                                        className="w-full border px-4 py-2 rounded-md bg-gray-100"
                                                    />
                                                    <ErrorMessage
                                                        name={`for[${index}].text`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </FieldArray>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  md:col-span-2 mb-4 ">
                            {/* Ingredients Section */}
                            <div className="w-full">
                                <label className="text-lg font-semibold mt-1">Ingredients</label>
                                <label className="block text-sm font-medium mt-4">Text</label>
                                <input
                                    type="text"
                                    name="ingredientText"
                                    placeholder="Type......"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.ingredientText}
                                    className="w-full border px-4 py-2 rounded-md bg-gray-100"
                                />
                                <ErrorMessage
                                    name="ingredientText"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* For Section */}
                            <div className="w-full">
                                <label className="text-lg font-semibold mt-1">For</label>
                                <label className="block text-sm font-medium mt-4">Text</label>
                                <input
                                    type="text"
                                    name="forType"
                                    placeholder="Type..."
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.forType}
                                    className="w-full border px-4 py-2 rounded-md bg-gray-100"
                                />
                                <ErrorMessage
                                    name="forType"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>
                        </div>

                        <div className="space-y-8 md:col-span-2 mb-4 ">
                            {/* General Section */}
                            <h2 className="text-lg font-semibold">Offers</h2>
                            <div>
                                {/* Offers Title */}

                                <h3 className="text-md font-semibold mb-4">General</h3>

                                {/* Row with two inputs side-by-side */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Discount Type Select */}
                                    <div className="flex flex-col w-full max-w-7xl">
                                        <label className="block text-sm font-medium mb-1">Discount Type</label>
                                        <Field
                                            as="select"
                                            name="offers.discountType"
                                            className="w-full border px-4 py-2 rounded-md bg-gray-100 text-sm appearance-none outline-none"
                                        >
                                            <option value="">Select discount type</option>
                                            <option value="Percentage discount">Percentage discount</option>
                                            <option value="Fixed cart discount">Fixed cart discount</option>
                                        </Field>
                                    </div>

                                    {/* Coupon Type Input */}
                                    <div className="flex flex-col w-full max-w-7xl">
                                        <label className="block text-sm font-medium mb-1">Coupon Type</label>
                                        <Field
                                            type="text"
                                            name="offers.couponType"
                                            placeholder="0"
                                            className="w-full border px-4 py-2 rounded-md bg-gray-100 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                                    {/* Coupon Expiry Date Field */}
                                    <div className="flex flex-col w-full">
                                        <label className="block text-sm font-medium mb-1">Coupon Expiry Date</label>
                                        <Field
                                            type="text"
                                            name="offers.expiryDate"
                                            placeholder="DD/MM/YYYY"
                                            className="w-full h-11 border px-4 py-2 rounded-md bg-gray-100 text-sm"
                                        />
                                    </div>

                                    {/* Offer Source Dropdown */}
                                    <div className="flex flex-col w-full">
                                        <label className="block text-sm font-medium mb-1">Offer Source</label>
                                        <Field
                                            as="select"
                                            name="offers.source"
                                            className="w-full h-11 border px-4 py-2 rounded-md bg-gray-100 text-sm appearance-none outline-none"
                                        >
                                            <option value="">Select source</option>
                                            <option value="Website">Website</option>
                                            <option value="App">App</option>
                                            <option value="Referral">Referral</option>
                                            <option value="Partnered">Partnered</option>
                                        </Field>
                                    </div>
                                </div>

                            </div>

                            {/* Usage Restriction Section */}
                            <div>
                                <h3 className="text-md font-semibold mb-4">Usage Restriction</h3>
                                <div className="flex flex-col md:flex-row md:flex-wrap gap-6">
                                    <div className="w-full md:w-[48%]">
                                        <label className="block text-sm mb-1">Minimum Spend</label>
                                        <Field
                                            type="text"
                                            name="usageRestrictions.minSpend"
                                            placeholder="No Minimum"
                                            className="w-full border px-4 py-2 rounded-md bg-gray-100"
                                        />
                                    </div>
                                    <div className="w-full md:w-[48%]">
                                        <label className="block text-sm mb-1">Products</label>
                                        <Field
                                            as="select"
                                            name="usageRestrictions.products"
                                            className="w-full border px-4 py-2 rounded-md bg-gray-100 text-sm h-11 appearance-none"
                                        >
                                            <option value="">Select a product</option>
                                            <option value="product1">Product 1</option>
                                            <option value="product2">Product 2</option>
                                            <option value="product3">Product 3</option>
                                            {/* Add more products dynamically if needed */}
                                        </Field>
                                    </div>

                                </div>
                            </div>

                            {/* Usage Limits Section */}
                            <div>
                                <h3 className="text-md font-semibold mb-4">Usage Limits</h3>
                                <div className="flex flex-col md:flex-row md:flex-wrap gap-6">
                                    <div className="w-full md:w-[48%]">
                                        <label className="block text-sm mb-1">Usage Limit Per Coupon</label>
                                        <Field
                                            type="text"
                                            name="usageLimits.perCoupon"
                                            placeholder="Unlimited usage"
                                            className="w-full border px-4 py-2 rounded-md bg-gray-100"
                                        />
                                    </div>
                                    <div className="w-full md:w-[48%]">
                                        <label className="block text-sm mb-1">Usage Limit Per User</label>
                                        <Field
                                            type="text"
                                            name="usageLimits.perUser"
                                            placeholder="Unlimited usage"
                                            className="w-full border px-4 py-2 rounded-md bg-gray-100"
                                        />
                                    </div>
                                </div>
                            </div>
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
