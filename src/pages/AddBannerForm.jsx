import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Table from "../components/common/Table";
import { API_BASE_URL, API_ENDPOINTS } from "../networking/apiConfig";
import BaseApiManager from "../networking/baseAPIManager";

const AddBannerForm = () => {
  const [statusOptions, setStatusOptions] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [bannerData, setBannerData] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const columns = [
    { header: "Banner Title", accessor: "title" },
    { header: "Link", accessor: "link" },
    { header: "Status", accessor: "status" },
    { header: "Action", accessor: "action" },
  ];

  const fetchBanners = async () => {
    try {
      const response = await BaseApiManager.get(
        `${API_BASE_URL}${API_ENDPOINTS.GET_ALL_BANNERS}`
      );

      const formatted = response.map((banner) => {
        // Clean the path (convert \ to /, remove leading 'uploads/')
        const cleanedPath = banner.image.replace(/\\/g, '/').replace(/^uploads\//, '');
        const imageUrl = `${API_BASE_URL}/uploads/${cleanedPath}`;

        return {
          ...banner,
          imageUrl,
          status:
            banner.status?.charAt(0).toUpperCase() +
            banner.status?.slice(1).toLowerCase(),
          action: (
            <button
              onClick={() => setSelectedBanner({ ...banner, imageUrl })}
              className="bg-[#454545] text-white text-lg rounded-full px-6 py-2 w-[125px] h-[57px] flex items-center justify-center"
            >
              View
            </button>
          ),
        };
      });

      setBannerData(formatted);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
      toast.error("Failed to load banners");
    }
  };

  useEffect(() => {
    setStatusOptions(["Active", "Inactive"]);
    fetchBanners();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      link: "",
      status: "",
      image: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      status: Yup.string().required("Status is required"),
      link: Yup.string().url("Invalid URL").required("Link is required"),
      image: Yup.mixed()
        .required("Image is required")
        .test("fileExists", "Image is required", (value) => value instanceof File),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("link", values.link);
      formData.append("status", values.status);
      formData.append("image", values.image);

      try {
        await BaseApiManager.post(API_ENDPOINTS.ADD_BANNER, formData);
        toast.success("Banner added successfully!");
        resetForm();
        setImageFile(null);
        fetchBanners();
      } catch (err) {
        console.error(err);
        toast.error("Failed to add banner");
      }
    },
  });

  return (
    <div>
      <div className="p-4 md:p-8 bg-white rounded-[40px] shadow-sm w-full mx-auto">
        <h2 className="text-lg font-semibold mb-6">Add New Banner</h2>

        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          encType="multipart/form-data"
        >
          <div>
            <label className="block mb-1 font-medium">Banner Title</label>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Banner Title"
              className="w-full bg-[#EFEFEF] p-2 rounded-md focus:outline-none"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-sm">{formik.errors.title}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Upload Banner Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.currentTarget.files[0];
                formik.setFieldValue("image", file);
                setImageFile(file);
              }}
              className="w-full bg-[#EFEFEF] p-2 rounded-md focus:outline-none"
            />
            {formik.touched.image && formik.errors.image && (
              <p className="text-red-500 text-sm">{formik.errors.image}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Link</label>
            <input
              type="text"
              name="link"
              value={formik.values.link}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="https://..."
              className="w-full bg-[#EFEFEF] p-2 rounded-md focus:outline-none"
            />
            {formik.touched.link && formik.errors.link && (
              <p className="text-red-500 text-sm">{formik.errors.link}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full bg-[#EFEFEF] p-2 rounded-md focus:outline-none"
            >
              <option value="">Select Status</option>
              {statusOptions.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {formik.touched.status && formik.errors.status && (
              <p className="text-red-500 text-sm">{formik.errors.status}</p>
            )}
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Add Banner
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8">
        <Table columns={columns} data={bannerData} title="All Banner" />
      </div>

      {/* Modal */}
      {selectedBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative">
            <button
              onClick={() => setSelectedBanner(null)}
              className="absolute top-2 right-2 text-xl font-bold text-red-500"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4 text-center">View Banner</h3>
            <img
              src={selectedBanner.imageUrl}
              alt="Banner"
              className="w-full object-cover rounded-lg mb-4"
            />
            <div className="flex justify-center gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Active
              </button>
              <button className="bg-red-400 text-white px-4 py-2 rounded-md">
                Inactive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBannerForm;
