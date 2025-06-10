import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Table from "../components/common/Table";

const AddBannerForm = () => {
    const [statusOptions, setStatusOptions] = useState([]);
    const [imageFile, setImageFile] = useState(null);

    const columns = [
        { header: "Banner Title", accessor: "title" },
        { header: "Link (Optional)", accessor: "link" },
        { header: "Stats", accessor: "status" },
        { header: "Action", accessor: "action" }
    ];

    const bannerData = [
        { title: "Banner Title–1", link: "www.figma.com", status: "Active" },
        { title: "Banner Title–2", link: "www.figma.com", status: "Inactive" },
        { title: "Banner Title–3", link: "www.figma.com", status: "Active" },
        { title: "Banner Title–4", link: "www.figma.com", status: "Active" }
    ];


    useEffect(() => {
        // Replace this with actual API if needed
        setStatusOptions(["Active", "Inactive"]);
    }, []);

    const formik = useFormik({
        initialValues: {
            title: "",
            link: "",
            status: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            status: Yup.string().required("Status is required"),
            link: Yup.string().url("Invalid URL").nullable(),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (!imageFile) {
                toast.error("Please upload a banner image");
                return;
            }

            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("link", values.link);
            formData.append("status", values.status);
            formData.append("image", imageFile);

            try {
                // await createBanner(formData); // Replace with real API
                toast.success("Banner added successfully!");
                resetForm();
                setImageFile(null);
            } catch (err) {
                console.error(err);
                toast.error("Failed to add banner");
            }
        },
    });

    return (
        <div className="">

            <div className="p-4 md:p-8 bg-white rounded-[40px] shadow-sm w-full mx-auto  ">
                <h2 className="text-lg font-semibold mb-6">Add New Banner</h2>

                <form
                    onSubmit={formik.handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    encType="multipart/form-data"
                >
                    {/* Title */}
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

                    {/* Image File */}
                    <div>
                        <label className="block mb-1 font-medium">Upload Banner Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) setImageFile(file);
                            }}
                            className="w-full bg-[#EFEFEF] p-2 rounded-md focus:outline-none"
                        />
                    </div>

                    {/* Link */}
                    <div>
                        <label className="block mb-1 font-medium">Link (Optional)</label>
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

                    {/* Status */}
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

                    {/* Submit Button */}
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
            <div className="mt-8 ">
                <Table columns={columns} data={bannerData} title="All Banner" />
            </div>

        </div>

    );
};

export default AddBannerForm;
