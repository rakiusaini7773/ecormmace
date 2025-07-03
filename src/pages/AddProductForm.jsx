import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MdOutlineFileOpen } from 'react-icons/md';
import { FiPlus, FiX } from "react-icons/fi";

import { toast } from 'react-toastify';
import BaseApiManager from '../networking/baseAPIManager';
import { API_BASE_URL, API_ENDPOINTS } from "../networking/apiConfig";
import ApplicableProductsField from './ApplicableProductsField';
import axios from 'axios';
import Loader from '../components/common/Loading';
import Table from "../components/common/Table";
import BannerViewModal from './BannerViewModal';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const AddProductForm = () => {
    const [loading, setloading] = useState(false)
    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const [imageFile, setImageFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [couponTypes, setCouponTypes] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const fetchProducts = async () => {
        try {
            const data = await BaseApiManager.get(API_ENDPOINTS.GET_ALL_PRODUCTS);
            console.log('data', data)
            setProducts(data);
        } catch (error) {
            toast.error("Failed to fetch products");
        }
    };

    const handleView = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const fetchCouponTypes = async () => {
        try {
            const response = await BaseApiManager.get(`${API_BASE_URL}${API_ENDPOINTS.GET_ALL_OFFERS}`);
            setCouponTypes(response);
        } catch (err) {
            toast.error('Failed to load coupon types');
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await BaseApiManager.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            setCategories(data);
        } catch (error) {
            toast.error('Failed to load categories');
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchCouponTypes();
        fetchProducts();
    }, []);

    const initialValues = {
        heading: '',
        subHeading: '',
        subDescription: '',
        description: '',
        price: '',
        videoUrl: '',
        tag: '',
        offerCode: '',
        rating: '',
        status: 'Inactive',
        category: '',
        productImages: [],
        helpsWith: [{ icon: '', text: '' }],
        ingredientText: '',
        for: '',
        offers: {
            discountType: '',
            discountValue: '',
            couponType: '',
            expiryDate: '',
            source: ''
        },
        usageRestrictions: {
            minSpend: '',
            products: []
        },
        usageLimits: {
            perCoupon: '',
            perUser: ''
        }
    };

    const validationSchema = Yup.object().shape({
        heading: Yup.string().required('Heading is required'),
        subHeading: Yup.string().required('Sub Heading is required'),
        subDescription: Yup.string().required('Sub Description is required'),
        description: Yup.string().required('Description is required'),
        price: Yup.number().required('Price is required'),
        videoUrl: Yup.mixed()
            .required('Video file is required')
            .test('fileType', 'Only video files are allowed', value =>
                value && value.type && value.type.startsWith('video/')
            ),
        tag: Yup.string().required('Tag is required'),
        rating: Yup.number().required('Rating is required'),
        status: Yup.string().required('Status is required'),
        category: Yup.string().required('Category is required'),
        productImages: Yup.array()
            .min(2, 'At least 2 product images are required')
            .of(Yup.mixed().required('Image is required')),
        helpsWith: Yup.array().of(
            Yup.object().shape({
                icon: Yup.string().required('Icon is required'),
                text: Yup.string().required('Text is required')
            })
        ).min(1, 'At least one "Helps With" item is required'),
        ingredientText: Yup.string().required('Ingredient text is required'),
        for: Yup.string().required('"For" field is required'),
        // offers: Yup.object().shape({
        //     discountType: Yup.string().required('Discount Type is required'),
        //     discountValue: Yup.string().required('Discount Value is required'),
        //     couponType: Yup.string().required('Coupon Type is required'),
        //     expiryDate: Yup.string().required('Expiry Date is required'),

        // }),
        // usageRestrictions: Yup.object().shape({
        //     minSpend: Yup.string().required('Minimum Spend is required'),
        //     products: Yup.array().of(Yup.string()).min(1, 'Select at least one product').required('Products field is required')
        // }),
        // usageLimits: Yup.object().shape({
        //     perCoupon: Yup.string().required('Per Coupon limit is required'),
        //     perUser: Yup.string().required('Per User limit is required')
        // })
    });

    const handleSubmit = async (values, { resetForm }) => {
        setloading(true);
        const formData = new FormData();

        // ✅ Append product images
        if (Array.isArray(values.productImages)) {
            values.productImages.forEach((file) => {
                if (file instanceof File) {
                    formData.append('productImages', file);
                }
            });
        }

        // ✅ Append product video
        if (values.videoUrl instanceof File) {
            formData.append('videoUrl', values.videoUrl);
        }

        // ✅ helpsWith icons and data
        values.helpsWith.forEach((item, i) => {
            // Upload icon file under helpsWithIcons{i}
            if (item.icon instanceof File) {
                formData.append(`helpsWithIcons${i}`, item.icon);
            }
        });

        // Send helpsWith JSON with icon names (Cloudinary will return actual URLs on backend)
        formData.append('helpsWith', JSON.stringify(
            values.helpsWith.map(({ text, icon }) => ({
                text,
                icon: icon instanceof File ? icon.name : icon
            }))
        ));

        // ✅ Append other structured fields
        const stringifiedFields = ['offers', 'usageRestrictions', 'usageLimits'];
        Object.entries(values).forEach(([key, value]) => {
            if (['productImages', 'videoUrl', 'helpsWith'].includes(key)) return;

            if (stringifiedFields.includes(key)) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value ?? '');
            }
        });

        try {
            const response = await BaseApiManager.post(API_ENDPOINTS.ADD_PRODUCT, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.success('✅ Product added successfully');
            console.log("🟢 Server response:", response);
            resetForm();
        } catch (err) {
            console.error('❌ Upload failed', err);
            toast.error('❌ Failed to add product');
        } finally {
            setloading(false);
        }
    };




    const handleImageUploadClick = () => imageInputRef.current?.click();
    const handleVideoUploadClick = () => videoInputRef.current?.click();

    const navigate = useNavigate();


    const columns = [
        {
            Header: "Heading",
            accessor: "heading",
        },
        {
            Header: "Tag",
            accessor: "tag",
        },
        {
            Header: "Price",
            accessor: "price",
        },
        {
            Header: "Status",
            accessor: "status",
            Cell: ({ value }) => (
                <span className={value === "Active" ? "text-blue-600" : "text-red-500"}>
                    {value}
                </span>
            ),
        },
        {
            Header: "Rating",
            accessor: "rating",
        },
        {
            Header: "Action",
            Cell: ({ row }) => (
                <div className="flex gap-2">
                    {/* View Button */}
                    <button
                        onClick={() => {
                            setSelectedProduct(row.original); // Show modal with product info
                            setShowModal(true);
                        }}
                        className="bg-[#454545] text-white text-sm rounded-full px-6 py-2 w-[125px] h-[45px] flex items-center justify-center"
                    >
                        View
                    </button>

                    {/* Edit Icon Button */}

                    <button
                        onClick={() => navigate(`/edit-product/${row.original._id}`)}
                        className="flex items-center justify-center w-10 h-10 bg-[#454545] text-white rounded-full shadow-md transition duration-200"
                        title="Edit Product"
                    >
                        <FaEdit className="w-4 h-4" />
                    </button>


                </div>
            ),
        },
    ];

    const allowedImageTypes = ["image/png", "image/jpg", "image/jpeg"];

    return (
        <>
            <div className="p-6 bg-white shadow rounded">
                <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    //  validationSchema={null}
                    onSubmit={handleSubmit}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {({ values, setFieldValue, errors, touched }) => (
                        <Form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Product Images <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="file"
                                            accept=".png, .jpg, .jpeg"
                                            multiple
                                            ref={imageInputRef}
                                            onChange={(e) => {
                                                const files = Array.from(e.target.files || []);
                                                const validFiles = files.filter(file => allowedImageTypes.includes(file.type));

                                                if (validFiles.length !== files.length) {
                                                    alert("Only .png, .jpg, .jpeg files are allowed.");
                                                }

                                                setImageFile(validFiles);
                                                setFieldValue("productImages", validFiles);
                                            }}
                                            className="hidden"
                                        />

                                        <input
                                            type="text"
                                            readOnly
                                            value={imageFile?.map(file => file.name).join(", ") || ""}
                                            placeholder="No files chosen"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                                        />

                                        <button
                                            type="button"
                                            onClick={handleImageUploadClick}
                                            className="p-3 bg-[#454545] text-white rounded-md hover:bg-gray-700"
                                            title="Upload"
                                        >
                                            <MdOutlineFileOpen className="text-2xl" />
                                        </button>
                                    </div>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Only .png, .jpg, .jpeg formats are allowed.
                                    </p>

                                    {/* Error message for productImages */}
                                    <ErrorMessage
                                        name="productImages"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>



                                {/* Video Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Product Video <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="file"
                                            accept="video/mp4"
                                            ref={videoInputRef}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    if (file.type !== "video/mp4") {
                                                        alert("Only .mp4 video format is allowed.");
                                                        e.target.value = ""; // clear the input
                                                        setVideoFile(null);
                                                        setFieldValue("videoUrl", null);
                                                        return;
                                                    }

                                                    setVideoFile(file);
                                                    setFieldValue("videoUrl", file);
                                                }
                                            }}
                                            className="hidden"
                                        />

                                        <input
                                            type="text"
                                            readOnly
                                            value={videoFile?.name || ""}
                                            placeholder="No file chosen"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => videoInputRef.current?.click()}
                                            className="p-3 bg-[#454545] text-white rounded-md hover:bg-gray-700"
                                            title="Upload"
                                        >
                                            <MdOutlineFileOpen className="text-2xl" />
                                        </button>
                                    </div>

                                    <p className="mt-1 text-xs text-gray-500">Only .mp4 video format is allowed.</p>

                                    <ErrorMessage
                                        name="videoUrl"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>




                                {/* Form Fields */}
                                <div className="flex flex-col">
                                    <label htmlFor="heading" className="text-sm font-medium text-gray-700 mb-1">Heading</label>
                                    <Field name="heading" placeholder="Enter heading" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                                    <ErrorMessage name="heading" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="price" className="text-sm font-medium text-gray-700 mb-1">Price</label>
                                    <Field name="price" type="number" placeholder="Enter price" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                                    <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="subHeading" className="text-sm font-medium text-gray-700 mb-1">Sub Heading</label>
                                    <Field name="subHeading" placeholder="Enter sub heading" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                                    <ErrorMessage name="subHeading" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="subDescription" className="text-sm font-medium text-gray-700 mb-1">Sub Description</label>
                                    <Field name="subDescription" placeholder="Enter sub description" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                                    <ErrorMessage name="subDescription" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="tag" className="text-sm font-medium text-gray-700 mb-1">Tag</label>
                                    <Field name="tag" placeholder="Enter tag ex. " className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                                    <ErrorMessage name="tag" component="div" className="text-red-500 text-sm mt-1" />
                                </div>





                                <div className="flex flex-col">
                                    <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <Field as="select" name="status" className="w-full px-4 py-2 border border-gray-300 rounded-md">
                                        <option value="">Select status</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </Field>
                                    <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="rating" className="text-sm font-medium text-gray-700 mb-1">Rating</label>
                                    <Field
                                        name="rating"
                                        type="number"
                                        step="0.1"
                                        placeholder="Enter rating"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                    <ErrorMessage name="rating" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <Field
                                        as="select"
                                        name="category"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white "
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                                </div>


                                <div className="flex flex-col col-span-2">
                                    <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <Field
                                        as="textarea"
                                        name="description"
                                        placeholder="Enter description"
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                                </div>


                            </div>
                            <div>

                                <FieldArray name="helpsWith">
                                    {({ push, remove }) => (
                                        <div className="mb-6">
                                            <h3 className="text-xl font-semibold mb-4 text-black">Helps With</h3>
                                            <div className="flex justify-end mb-2">
                                                <button
                                                    type="button"
                                                    onClick={() => push({ icon: '', text: '' })}
                                                    className="w-8 h-8 bg-[#333] text-white rounded-md flex items-center justify-center hover:bg-gray-700"
                                                >
                                                    <FiPlus size={16} />
                                                </button>
                                            </div>

                                            {values.helpsWith.map((_, i) => (
                                                <div key={i} className="grid grid-cols-12 gap-3 items-end mb-4 bg-white p-2 rounded-md">
                                                    <div className="col-span-5">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                                        <div className="flex">
                                                            <input
                                                                type="text"
                                                                value={values.helpsWith[i].icon?.name || ''}
                                                                readOnly
                                                                placeholder="No file chosen"
                                                                className="w-full px-3 py-2 bg-gray-100 text-sm border border-gray-300 rounded-l-md"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => document.getElementById(`iconInput-${i}`).click()}
                                                                className="bg-[#333] text-white px-3 rounded-r-md"
                                                            >
                                                                <MdOutlineFileOpen className="text-lg" />
                                                            </button>
                                                        </div>
                                                        <input
                                                            id={`iconInput-${i}`}
                                                            type="file"
                                                            accept="image/png, image/jpeg, image/jpg"
                                                            hidden
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    setFieldValue(`helpsWith[${i}].icon`, file);
                                                                }
                                                            }}
                                                        />
                                                        {errors.helpsWith?.[i]?.icon && touched.helpsWith?.[i]?.icon && (
                                                            <div className="text-red-500 text-sm mt-1">{errors.helpsWith[i].icon}</div>
                                                        )}
                                                    </div>

                                                    <div className="col-span-6">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
                                                        <Field
                                                            name={`helpsWith[${i}].text`}
                                                            placeholder="e.g. Boosts Immunity"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100"
                                                        />
                                                        <ErrorMessage
                                                            name={`helpsWith[${i}].text`}
                                                            component="div"
                                                            className="text-red-500 text-sm mt-1"
                                                        />
                                                    </div>

                                                    <div className="col-span-1 flex justify-end">
                                                        {values.helpsWith.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => remove(i)}
                                                                className="w-8 h-8 bg-red-600 text-white rounded-md flex items-center justify-center hover:bg-red-700"
                                                            >
                                                                <FiX size={16} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </FieldArray>


                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ingredient Text</label>
                                    <Field
                                        name="ingredientText"
                                        placeholder="e.g. Contains herbs"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm"
                                    />
                                    <ErrorMessage name="ingredientText" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">For</label>
                                    <Field
                                        name="for"
                                        placeholder="e.g. Adults, Teens"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm"
                                    />
                                    <ErrorMessage name="for" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Offers</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    {/* Discount Type - Select Box */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                                        <Field
                                            as="select"
                                            name="offers.discountType"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-sm"
                                        >
                                            <option value="">Select Discount Type</option>
                                            <option value="Percentage">Percentage</option>
                                            <option value="Flat">Flat</option>
                                        </Field>
                                        <ErrorMessage name="offers.discountType" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Discount Value */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
                                        <Field
                                            name="offers.discountValue"
                                            type="number"
                                            placeholder="e.g. 20"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm"
                                        />
                                        <ErrorMessage name="offers.discountValue" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Coupon Type - Backend Dynamic Select */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Type</label>
                                        <Field
                                            as="select"
                                            name="offers.couponType"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-sm"
                                        >
                                            <option value="">Select Coupon Type</option>
                                            {couponTypes.map((type) => (
                                                <option key={type._id} value={type.offerCode}>{type.offerCode}</option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="offers.couponType" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Expiry Date */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                        <Field
                                            name="offers.expiryDate"
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm"
                                        />
                                        <ErrorMessage name="offers.expiryDate" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </div>
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Restrictions</h3>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Spend</label>
                                        <Field name="usageRestrictions.minSpend" type="number" placeholder="e.g. 500" className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm" />
                                        <ErrorMessage name="usageRestrictions.minSpend" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <ApplicableProductsField values={values} setFieldValue={setFieldValue} />
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Limits</h3>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Per Coupon</label>
                                        <Field name="usageLimits.perCoupon" type="number" placeholder="e.g. 1" className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm" />
                                        <ErrorMessage name="usageLimits.perCoupon" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Per User</label>
                                        <Field name="usageLimits.perUser" type="number" placeholder="e.g. 2" className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm" />
                                        <ErrorMessage name="usageLimits.perUser" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </div>
                            </div>


                            <div className='flex justify-end items-end '>
                                <button type="submit" className="bg-[#454545] text-white px-4 py-2 rounded hover:bg-[#454545]">Add Product</button>
                            </div>

                        </Form>
                    )}

                </Formik>
            </div >

            <div className="mt-8">
                <Table columns={columns} data={products} title="All Banners" />
            </div>
            {showModal && selectedProduct && (
                <BannerViewModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    selectedProduct={selectedProduct}
                    refreshProducts={fetchProducts}
                />
            )}
            {loading && <Loader />}



        </>

    );
};

export default AddProductForm;
