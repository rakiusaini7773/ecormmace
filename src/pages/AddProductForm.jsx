import React, { useRef, useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { MdOutlineFileOpen } from 'react-icons/md';
import { FiPlus, FiX } from "react-icons/fi";

const AddProductForm = () => {
    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const [imageFile, setImageFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);

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
        for: [{ icon: '', text: '' }],
        ingredients: [{ name: '', type: '' }],
        ingredientText: '',
        forType: '',
        offers: {
            discountType: '',
            discountValue: '',
            couponType: '',
            expiryDate: '',
            source: ''
        },
        usageRestrictions: {
            minSpend: '',
            products: ''
        },
        usageLimits: {
            perCoupon: '',
            perUser: ''
        }
    };
    // const { values } = useFormikContext();

    const validationSchema = Yup.object().shape({
        heading: Yup.string().required('Heading is required'),
        price: Yup.number().required('Price is required'),
        description: Yup.string().required('Description is required'),
        status: Yup.string().required('Status is required'),
        category: Yup.string().required('Category is required')
    });

    const handleSubmit = (values) => {
        const formData = new FormData();

        if (Array.isArray(values.productImages)) {
            values.productImages.forEach((file) => {
                if (file instanceof File) {
                    formData.append('productImages', file);
                }
            });
        }

        if (values.videoUrl instanceof File) {
            formData.append('videoUrl', values.videoUrl);
        }

        Object.entries(values).forEach(([key, value]) => {
            if (key === 'productImages' || key === 'videoUrl') return;
            formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
        });

        console.log('FormData Preview:');
        for (let [key, val] of formData.entries()) {
            console.log(key, val);
        }

        // Send to backend here
        // axios.post('/api/products', formData)
    };

    const handleImageUploadClick = () => imageInputRef.current?.click();
    const handleVideoUploadClick = () => videoInputRef.current?.click();

    return (
        <div className="p-6 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ values, setFieldValue }) => (
                    <Form className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={imageInputRef}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            setImageFile(file);
                                            setFieldValue('productImages', file ? [file] : []);
                                        }}
                                        className="hidden"
                                    />
                                    <input
                                        type="text"
                                        readOnly
                                        value={imageFile?.name || ''}
                                        placeholder="No file chosen"
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
                                            setVideoFile(file);
                                            setFieldValue('videoUrl', file || '');
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
                                        onClick={handleVideoUploadClick}
                                        className="p-3 bg-[#454545] text-white rounded-md hover:bg-gray-700"
                                        title="Upload"
                                    >
                                        <MdOutlineFileOpen className="text-2xl" />
                                    </button>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="flex flex-col">
                                <label htmlFor="heading" className="text-sm font-medium text-gray-700 mb-1">Heading</label>
                                <Field name="heading" placeholder="Enter heading" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="price" className="text-sm font-medium text-gray-700 mb-1">Price</label>
                                <Field name="price" type="number" placeholder="Enter price" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="subHeading" className="text-sm font-medium text-gray-700 mb-1">Sub Heading</label>
                                <Field name="subHeading" placeholder="Enter sub heading" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="subDescription" className="text-sm font-medium text-gray-700 mb-1">Sub Description</label>
                                <Field name="subDescription" placeholder="Enter sub description" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="tag" className="text-sm font-medium text-gray-700 mb-1">Tag</label>
                                <Field name="tag" placeholder="Enter tag" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                            </div>

                            {/* <div className="flex flex-col">
                                <label htmlFor="offerCode" className="text-sm font-medium text-gray-700 mb-1">Offer Code</label>
                                <Field name="offerCode" placeholder="Enter offer code" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                            </div> */}



                            <div className="flex flex-col">
                                <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">Status</label>
                                <Field as="select" name="status" className="w-full px-4 py-2 border border-gray-300 rounded-md">
                                    <option value="">Select status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </Field>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="rating" className="text-sm font-medium text-gray-700 mb-1">Rating</label>
                                <Field name="rating" type="number" step="0.1" placeholder="Enter rating" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">Category</label>
                                <Field name="category" placeholder="Enter category" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                            </div>
                            <div className="flex flex-col col-span-2">
                                <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">Description</label>
                                <Field as="textarea" name="description" placeholder="Enter description" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                            </div>

                        </div>
                        <div>
                            <FieldArray name="helpsWith">
                                {({ push, remove }) => (
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-4 text-black">Product Details</h3>
                                        <label className="block text-lg font-medium mb-2">Helps with</label>

                                        {/* ➕ Add More Button */}
                                        <div className="flex justify-end ">
                                            <button
                                                type="button"
                                                onClick={() => push({ icon: '', text: '' })}
                                                className="w-8 h-8 bg-[#333] text-white rounded-md flex items-center justify-center hover:bg-gray-700 transition"
                                                title="Add More"
                                            >
                                                <FiPlus size={16} />
                                            </button>
                                        </div>

                                        {/* Dynamic Fields */}
                                        {values.helpsWith.map((_, i) => (
                                            <div
                                                key={i}
                                                className="grid grid-cols-12 gap-3 mb-4 items-end bg-white  rounded-md"
                                            >
                                                {/* Icon Upload */}
                                                <div className="col-span-5">
                                                    <label
                                                        htmlFor={`helpsWith[${i}].icon`}
                                                        className="block text-sm text-gray-800 mb-1"
                                                    >
                                                        Icon Upload
                                                    </label>
                                                    <div className="flex">
                                                        <input
                                                            type="text"
                                                            placeholder="e. g. 4.5"
                                                            value={values.helpsWith[i].icon?.name || ''}
                                                            readOnly
                                                            className="w-full bg-gray-200 text-sm px-4 py-2 rounded-l-md border border-gray-300"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => document.getElementById(`iconInput-${i}`).click()}
                                                            className="bg-[#333] text-white px-3 rounded-r-md flex items-center justify-center"
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
                                                                if (file) {
                                                                    setFieldValue(`helpsWith[${i}].icon`, file);
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Text Field */}
                                                <div className="col-span-6">
                                                    <label
                                                        htmlFor={`helpsWith[${i}].text`}
                                                        className="block text-sm text-gray-800 mb-1"
                                                    >
                                                        Text
                                                    </label>
                                                    <Field
                                                        name={`helpsWith[${i}].text`}
                                                        placeholder="e. g. RAIN87"
                                                        className="w-full bg-gray-200 text-sm px-4 py-2 rounded-md border border-gray-300"
                                                    />
                                                </div>

                                                {/* ❌ Remove Button — on Right End of Row */}
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
                            {/* INGREDIENTS */}
                            <div>
                                <label className="block text-lg font-semibold text-gray-900 mb-2">Ingredients</label>
                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">Text</label>
                                    <input
                                        type="text"
                                        placeholder="Type........"
                                        value={values.ingredients?.[0]?.type || ''}
                                        onChange={(e) => {
                                            const updated = [{ ...values.ingredients?.[0], type: e.target.value }];
                                            setFieldValue('ingredients', updated);
                                        }}
                                        className="w-full px-4 py-2 bg-gray-200 rounded-md text-sm border border-gray-300 placeholder:text-gray-500"
                                    />
                                </div>
                            </div>

                            {/* FOR */}
                            <div>
                                <label className="block text-lg font-semibold text-gray-900 mb-2">For</label>
                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">Type</label>
                                    <input
                                        type="text"
                                        placeholder="Type..."
                                        value={values.for?.[0]?.text || ''}
                                        onChange={(e) => {
                                            const updated = [{ ...values.for?.[0], text: e.target.value }];
                                            setFieldValue('for', updated);
                                        }}
                                        className="w-full px-4 py-2 bg-gray-200 rounded-md text-sm border border-gray-300 placeholder:text-gray-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Offers */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Offers</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Discount Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                                    <Field
                                        name="offers.discountType"
                                        placeholder="e.g. Percentage / Flat"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm"
                                    />
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
                                </div>

                                {/* Coupon Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Type</label>
                                    <Field
                                        name="offers.couponType"
                                        placeholder="e.g. New User / Seasonal"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm"
                                    />
                                </div>

                                {/* Expiry Date */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                    <Field
                                        name="offers.expiryDate"
                                        type="date"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm"
                                    />
                                </div>

                                {/* Source */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                                    <Field
                                        name="offers.source"
                                        placeholder="e.g. App / Website"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm"
                                    />
                                </div>

                            </div>
                        </div>


                        {/* Restrictions and Limits */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Usage Restrictions */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Restrictions</h3>

                                {/* Minimum Spend */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Spend</label>
                                    <Field
                                        name="usageRestrictions.minSpend"
                                        type="number"
                                        placeholder="e.g. 500"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm"
                                    />
                                </div>

                                {/* Applicable Products */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Applicable Products</label>
                                    <Field
                                        name="usageRestrictions.products"
                                        placeholder="Enter applicable products"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm"
                                    />
                                </div>
                            </div>

                            {/* Usage Limits */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Limits</h3>

                                {/* Per Coupon Limit */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Per Coupon</label>
                                    <Field
                                        name="usageLimits.perCoupon"
                                        type="number"
                                        placeholder="e.g. 1"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm"
                                    />
                                </div>

                                {/* Per User Limit */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Per User</label>
                                    <Field
                                        name="usageLimits.perUser"
                                        type="number"
                                        placeholder="e.g. 2"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm"
                                    />
                                </div>
                            </div>
                        </div>


                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Product</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddProductForm;
