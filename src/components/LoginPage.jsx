import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AiOutlineMail, AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import LoginImage from "../images/LoginPage.png";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            phone: "",
            password: "",
        },
        validationSchema: Yup.object({
            phone: Yup.string()
                .matches(/^[0-9]{10}$/, "Enter valid 10-digit phone number")
                .required("Phone number is required"),
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
                setErrors({ password: "Invalid phone number or password" });
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-r from-[#FEF1FA] to-[#DD86C1]"
        >
            {/* Background Image - Wider and Shorter */}
            <div className="absolute w-full md:w-2/3 h-[650px] md:h-[750px] left-4 md:left-0 ">
                <img
                    src={LoginImage}
                    alt="Foxtale Product"
                    className="w-full h-full object-cover"
                />
            </div>


            {/* Login Form */}
            <div className="absolute top-1/2 right-4 md:right-0 transform -translate-y-1/2 bg-[#FEDCF3] p-6 md:p-10 rounded-lg shadow-2xl w-[90%] sm:w-[70%] md:w-[40%] z-10">
                <h2 className="text-center text-2xl font-bold text-pink-700 mb-2">Welcome</h2>
                <p className="text-center text-gray-500 text-sm mb-6">Login To Continue!</p>

                <form onSubmit={formik.handleSubmit} className="flex flex-col items-center space-y-5">
                    {/* Email input */}
                    <div className="relative w-full max-w-sm">
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={`w-full px-4 py-2 pr-12 border rounded-md focus:outline-none ${formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {/* Icon fixed inside input box */}
                        <div className="absolute top-[25px] right-0 bg-[#FF7DDD] rounded-md w-10 h-10 flex items-center justify-center">
                            <AiOutlineMail className="text-white text-lg" />
                        </div>
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Password input */}
                    <div className="relative w-full max-w-sm">
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={`w-full px-4 py-2 pr-10 border rounded-md focus:outline-none ${formik.touched.password && formik.errors.password ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                           className="absolute top-[25px] right-0 bg-[#FF7DDD] rounded-md w-10 h-10 flex items-center justify-center text-white"
                        >
                            {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right text-sm text-pink-600 cursor-pointer hover:underline w-full max-w-sm">
                        Forgot Password?
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="w-full max-w-sm bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md transition"
                    >
                        {formik.isSubmitting ? "Logging in..." : "Submit"}
                    </button>

                    {/* Register Link */}
                    <p className="text-center text-sm mt-4">
                        Don’t have an account?
                        <span className="text-pink-600 ml-1 cursor-pointer hover:underline">Register</span>
                    </p>
                </form>

            </div>
        </div>




    );
};

export default LoginPage;
