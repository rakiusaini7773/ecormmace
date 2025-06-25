import React, { useRef, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdOutlineFileOpen } from "react-icons/md";
import * as Yup from "yup";
import BaseApiManager from "../networking/baseAPIManager";
import { API_BASE_URL, API_ENDPOINTS } from "../networking/apiConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../components/common/Table";
import OfferDetailModal from "./OfferDetailModal";

const Offers = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [imageError, setImageError] = useState("");
  const [offerData, setOfferData] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleFileUploadClick = () => fileInputRef.current.click();

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
      setImageError("");
    }
  };

  const fetchOffers = async () => {
    try {
      const response = await BaseApiManager.get(`${API_BASE_URL}${API_ENDPOINTS.GET_ALL_OFFERS}`);
      setOfferData(response);
    } catch (error) {
      toast.error("Failed to load offers");
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

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

    try {
      await BaseApiManager.post(`${API_BASE_URL}${API_ENDPOINTS.ADD_OFFER}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Offer added successfully!");
      resetForm();
      setFileName("");
      setImageError("");
      fetchOffers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add offer");
    }
  };

  const handleView = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOffer(null);
    setIsModalOpen(false);
  };

  const columns = [
    { Header: "Title", accessor: "title", Cell: ({ value }) => value || "—" },
    { Header: "Tag", accessor: "tag", Cell: ({ value }) => value || "—" },
    { Header: "Price (₹)", accessor: "price", Cell: ({ value }) => (value != null ? `₹${value}` : "—") },
    { Header: "Offer Code", accessor: "offerCode" },
    { Header: "Rating", accessor: "rating", Cell: ({ value }) => (value != null ? value : "—") },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <button
          className="bg-[#454545] text-white text-sm rounded-full px-6 py-2 w-[125px] h-[45px] flex items-center justify-center"
          onClick={() => handleView(row.original)}
        >
          View
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6">Add New Offer Card</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 flex flex-col">
              <label className="text-sm mb-1">Product Image</label>
              <div className="flex items-center space-x-2">
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                <input type="text" readOnly value={fileName} placeholder="Choose File" className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed" />
                <button type="button" onClick={handleFileUploadClick} className="p-3 bg-[#454545] text-white rounded-md hover:bg-gray-700">
                  <MdOutlineFileOpen className="text-2xl" />
                </button>
              </div>
              {imageError && <p className="text-sm text-red-500 mt-1">{imageError}</p>}
            </div>

            <div>
              <label className="text-sm mb-1">Tag</label>
              <Field type="text" name="tag" placeholder="BESTSELLER" className="w-full px-4 py-2 border rounded-md bg-gray-50" />
            </div>

            <div>
              <label className="text-sm mb-1">Product Title</label>
              <Field type="text" name="title" placeholder="Enter Product title" className="w-full px-4 py-2 border rounded-md bg-gray-50" />
            </div>

            <div>
              <label className="text-sm mb-1">Sub Description</label>
              <Field type="text" name="subDescription" placeholder="Type……….." className="w-full px-4 py-2 border rounded-md bg-gray-50" />
            </div>

            <div>
              <label className="text-sm mb-1">Price (₹)</label>
              <Field type="number" name="price" placeholder="e.g. 455" className="w-full px-4 py-2 border rounded-md bg-gray-50" />
            </div>

            <div>
              <label className="text-sm mb-1">Offer Code <span className="text-red-500">*</span></label>
              <Field type="text" name="offerCode" placeholder="e.g. RAIN87" className="w-full px-4 py-2 border rounded-md bg-gray-50" />
              <ErrorMessage name="offerCode" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="text-sm mb-1">Rating</label>
              <Field type="number" name="rating" placeholder="e.g. 4.5" step="0.1" className="w-full px-4 py-2 border rounded-md bg-gray-50" />
            </div>

            <div>
              <label className="text-sm mb-1">Status</label>
              <Field as="select" name="status" className="w-full px-4 py-2 border rounded-md bg-gray-50">
                <option value="">Select</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Field>
            </div>

            <div className="md:col-span-2 text-right mt-4">
              <button type="submit" className="px-6 py-2 bg-[#454545] text-white rounded-md hover:bg-gray-700">Add Offer</button>
            </div>
          </Form>
        </Formik>
      </div>

      <div className="mt-8">
        <Table columns={columns} data={offerData} title="All Offers" />
      </div>

      <OfferDetailModal isOpen={isModalOpen} onClose={handleCloseModal} data={selectedOffer} />
    </>
  );
};

export default Offers;
