import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdOutlineFileOpen } from "react-icons/md";
import * as Yup from "yup";
import BaseApiManager from "../networking/baseAPIManager";
import { API_BASE_URL, API_ENDPOINTS } from "../networking/apiConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Offers = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [imageError, setImageError] = useState("");

  const initialValues = {
    tag: "",
    title: "",
    subDescription: "",
    price: "",
    offerCode: "",
    rating: "",
    status: "",
  };

  const validationSchema = Yup.object({
    tag: Yup.string(),
    title: Yup.string(),
    subDescription: Yup.string(),
    price: Yup.number().nullable(),
    offerCode: Yup.string().required("Offer code is required"),
    rating: Yup.number().min(0).max(5).nullable(),
    status: Yup.string(),
  });

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
      setImageError("");
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    const imageFile = fileInputRef.current?.files?.[0];

    if (!imageFile) {
      setImageError("Product image is required");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const fullUrl = `${API_BASE_URL}${API_ENDPOINTS.ADD_OFFER}`;
    console.log('fullUrl',fullUrl)

    try {
      const response = await BaseApiManager.post(fullUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Offer added:", response);
      toast.success("Offer added successfully!");
      resetForm();
      setFileName("");
      setImageError("");
    } catch (error) {
      console.error("❌ Failed to add offer:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add offer");    
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Add New Offer Card</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Image */}
          <div className="col-span-1 flex flex-col">
            <label className="text-sm mb-1">Product Image</label>
            <div className="flex items-center space-x-2">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <input
                type="text"
                readOnly
                value={fileName}
                placeholder="Choose File"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
              />
              <button
                type="button"
                onClick={handleFileUploadClick}
                className="p-3 bg-[#454545] text-white rounded-md hover:bg-gray-700"
              >
                <MdOutlineFileOpen className="text-2xl" />
              </button>
            </div>
            {imageError && (
              <p className="text-sm text-red-500 mt-1">{imageError}</p>
            )}
          </div>

          {/* Tag */}
          <div>
            <label className="text-sm mb-1">Tag (e.g. NEW LAUNCH, TRENDING)</label>
            <Field
              type="text"
              name="tag"
              placeholder="BESTSELLER"
              className="w-full px-4 py-2 border rounded-md bg-gray-50"
            />
          </div>

          {/* Product Title */}
          <div>
            <label className="text-sm mb-1">Product Title</label>
            <Field
              type="text"
              name="title"
              placeholder="Enter Product title"
              className="w-full px-4 py-2 border rounded-md bg-gray-50"
            />
          </div>

          {/* Sub Description */}
          <div>
            <label className="text-sm mb-1">Sub Description (1 line)</label>
            <Field
              type="text"
              name="subDescription"
              placeholder="Type……….."
              className="w-full px-4 py-2 border rounded-md bg-gray-50"
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm mb-1">Price (₹)</label>
            <Field
              type="number"
              name="price"
              placeholder="e.g. 455"
              className="w-full px-4 py-2 border rounded-md bg-gray-50"
            />
          </div>

          {/* Offer Code */}
          <div>
            <label className="text-sm mb-1">
              Offer Code <span className="text-red-500">*</span>
            </label>
            <Field
              type="text"
              name="offerCode"
              placeholder="e.g. RAIN87"
              className="w-full px-4 py-2 border rounded-md bg-gray-50"
            />
            <ErrorMessage
              name="offerCode"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="text-sm mb-1">Rating (out of 5)</label>
            <Field
              type="number"
              name="rating"
              placeholder="e.g. 4.5"
              step="0.1"
              className="w-full px-4 py-2 border rounded-md bg-gray-50"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm mb-1">Status</label>
            <Field
              as="select"
              name="status"
              className="w-full px-4 py-2 border rounded-md bg-gray-50"
            >
              <option value="">Select</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Field>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-right mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-[#454545] text-white rounded-md hover:bg-gray-700"
            >
              Add Offer
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Offers;
