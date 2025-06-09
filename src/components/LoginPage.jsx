import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const LoginPage = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const res = await axios.post("http://localhost:5000/api/admin/login", values);
                alert("Login successful!");
                console.log(res.data);
            } catch (error) {
                console.error("API Error:", error);

                if (error.response) {
                    console.log("Server responded with:", error.response.data);
                } else if (error.request) {
                    console.log("Request was made but no response received:", error.request);
                } else {
                    console.log("Error setting up request:", error.message);
                }

                setErrors({ password: "Invalid email or password" });
            } finally {
                setSubmitting(false);
            }
        }

    });

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300 px-4 py-8">
            {/* Left Image */}
            <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
                <img
                    src="/foxtale-product.png"
                    alt="Foxtale Product"
                    className="max-w-xs md:max-w-md drop-shadow-xl"
                />
            </div>

            {/* Right Login Form */}
            <div className="md:w-1/3 w-full bg-white p-6 md:p-10 rounded-lg shadow-lg">
                <h2 className="text-center text-2xl font-bold text-pink-700">Welcome</h2>
                <p className="text-center text-gray-500 mb-6 text-sm">Login To Continue!</p>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* Email input */}
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={`w-full px-4 py-2 pr-10 border rounded-md focus:outline-none ${formik.touched.email && formik.errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                        />
                        <AiOutlineMail className="absolute right-3 top-3 text-pink-500" />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Password input */}
                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={`w-full px-4 py-2 pr-10 border rounded-md focus:outline-none ${formik.touched.password && formik.errors.password
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                        />
                        <AiFillEyeInvisible className="absolute right-3 top-3 text-pink-500" />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md transition"
                    >
                        {formik.isSubmitting ? "Logging in..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
