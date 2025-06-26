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
        setloading(true)
        const formData = new FormData();

        // ✅ Append product images
        if (Array.isArray(values.productImages)) {
            values.productImages.forEach((file) => {
                if (file instanceof File) {
                    formData.append("productImages", file);
                }
            });
        }

        // ✅ Append video file
        if (values.videoUrl instanceof File) {
            formData.append("videoUrl", values.videoUrl);
        }

        // ✅ Copy and clean remaining fields
        const cleanValues = { ...values };

        cleanValues.helpsWith = cleanValues.helpsWith.map((item) => {
            if (item.icon instanceof File) {
                formData.append("helpsWithIcons", item.icon);
                return { ...item, icon: item.icon.name };
            }
            return item;
        });

        // ✅ Append all non-file fields as JSON strings
        Object.entries(cleanValues).forEach(([key, value]) => {
            if (key === "productImages" || key === "videoUrl") return;
            formData.append(key, typeof value === "object" ? JSON.stringify(value) : value);
        });

        try {
            const response = await BaseApiManager.post(
                API_ENDPOINTS.ADD_PRODUCT,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            toast.success(" Product added successfully");

            console.log("🟢 Server response:", response);
            // ✅ Reset the form after successful submission
            resetForm();
        } catch (err) {
            console.error("❌ Upload failed", err);
            toast.error("❌ Failed to add product");
        } finally {
            setloading(false)
        }
    };

    const handleImageUploadClick = () => imageInputRef.current?.click();
    const handleVideoUploadClick = () => videoInputRef.current?.click();


    const columns = [
        { Header: "Heading", accessor: "heading" },
        { Header: "Tag", accessor: "tag" },
        { Header: "Price", accessor: "price" },
        { Header: "Status", accessor: "status" },
        { Header: "Rating", accessor: "rating" },
        {
            Header: "Action",
            accessor: "action",
            Cell: ({ row }) => (
                <button
                    onClick={() => {
                        setSelectedProduct(row.original); // row.original contains full row data
                        setShowModal(true);
                    }}
                    className="bg-[#454545] text-white text-sm rounded-full px-6 py-2 w-[125px] h-[45px] flex items-center justify-center"
                >
                    View
                </button>
            ),
        },
    ];


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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Images</label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            ref={imageInputRef}
                                            onChange={(e) => {
                                                const files = Array.from(e.target.files || []);
                                                setImageFile(files);
                                                setFieldValue('productImages', files);
                                            }}
                                            className="hidden"
                                        />
                                        <input
                                            type="text"
                                            readOnly
                                            value={imageFile?.map((file) => file.name).join(', ') || ''}
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

                                    {/* 👇 Error message for productImages */}
                                    <ErrorMessage
                                        name="productImages"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>



                                {/* Video Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Video</label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="file"
                                            accept="video/*"
                                            ref={videoInputRef}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setVideoFile(file);
                                                    setFieldValue('videoUrl', file);
                                                }
                                            }}
                                            className="hidden"
                                        />
                                        <input
                                            type="text"
                                            readOnly
                                            value={videoFile?.name || ''}
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
                                            <h3 className="text-xl font-semibold mb-4 text-black">Product Details</h3>
                                            <label className="block text-lg font-medium mb-2">Helps with</label>

                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => push({ icon: '', text: '' })}
                                                    className="w-8 h-8 bg-[#333] text-white rounded-md flex items-center justify-center hover:bg-gray-700 transition"
                                                    title="Add More"
                                                >
                                                    <FiPlus size={16} />
                                                </button>
                                            </div>

                                            {values.helpsWith.map((_, i) => (
                                                <div key={i} className="grid grid-cols-12 gap-3 mb-4 items-end bg-white rounded-md">
                                                    <div className="col-span-5">
                                                        <label htmlFor={`helpsWith[${i}].icon`} className="block text-sm text-gray-800 mb-1">Icon Upload</label>
                                                        <div className="flex">
                                                            <input
                                                                type="text"
                                                                placeholder="e.g. icon"
                                                                value={values.helpsWith[i].icon?.name || ''}
                                                                readOnly
                                                                className="w-full bg-gray-200 text-sm px-4 py-2 rounded-l-md border border-gray-300"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => document.getElementById(`iconInput-${i}`).click()}
                                                                className="bg-[#333] text-white px-3 rounded-r-md"
                                                            >
                                                                <MdOutlineFileOpen className="text-lg" />
                                                            </button>
                                                            <input
                                                                id={`iconInput-${i}`}
                                                                type="file"
                                                                accept="image/*"
                                                                hidden
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) setFieldValue(`helpsWith[${i}].icon`, file);
                                                                }}
                                                            />
                                                        </div>
                                                        {errors.helpsWith?.[i]?.icon && touched.helpsWith?.[i]?.icon && (
                                                            <div className="text-red-500 text-sm mt-1">{errors.helpsWith[i].icon}</div>
                                                        )}
                                                    </div>

                                                    <div className="col-span-6">
                                                        <label htmlFor={`helpsWith[${i}].text`} className="block text-sm text-gray-800 mb-1">Text</label>
                                                        <Field
                                                            name={`helpsWith[${i}].text`}
                                                            placeholder="e.g. Energy Boost"
                                                            className="w-full bg-gray-200 text-sm px-4 py-2 rounded-md border border-gray-300"
                                                        />
                                                        <ErrorMessage name={`helpsWith[${i}].text`} component="div" className="text-red-500 text-sm mt-1" />
                                                    </div>

                                                    <div className="col-span-1 flex items-end justify-end">
                                                        {values.helpsWith.length > 1 && i === values.helpsWith.length - 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => remove(i)}
                                                                className="w-8 h-8 bg-red-600 text-white rounded-md flex items-center justify-center hover:bg-red-700"
                                                                title="Remove"
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
