// src/pages/RegisterPage.js

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineMail, AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import LoginImage from "../images/LoginPage.png";
import BaseApiManager from "../networking/baseAPIManager";
import { API_ENDPOINTS } from "../networking/apiConfig";
import { FaRegUser } from "react-icons/fa";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phonenumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Enter a valid email").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      phonenumber: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await BaseApiManager.post(API_ENDPOINTS.REGISTERUSER, values);

        if (response?.token) {
          toast.success("Registration successful!");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          toast.error("Registration failed. Try again.");
        }
      } catch (error) {
        const status = error?.response?.status;
        const message = error?.response?.data?.message;

        if (status === 409 && message === "Email already exists") {
          toast.info("Email already exists. Please login.");
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else {
          toast.error(message || "Registration failed!");
        }

        console.error("Register Error:", error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-r from-[#FEF1FA] to-[#DD86C1]">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="absolute w-full md:w-2/3 h-[650px] md:h-[750px] left-4 md:left-0">
        <img src={LoginImage} alt="Foxtale Product" className="w-full h-full object-cover" />
      </div>

      <div className="absolute top-1/2 right-4 md:right-0 transform -translate-y-1/2 bg-[#FEDCF3] p-6 md:p-10 rounded-lg shadow-2xl w-[90%] sm:w-[70%] md:w-[40%] z-10">
        <h2 className="text-center text-2xl font-bold text-pink-700 mb-2">Register</h2>
        <p className="text-center text-gray-500 text-sm mb-6">Create a new account</p>

        <form onSubmit={formik.handleSubmit} className="flex flex-col items-center space-y-5">
          {/* Name */}
          <div className="relative w-full max-w-sm">
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={`w-full px-4 py-2 pr-12 border rounded-md focus:outline-none ${formik.touched.name && formik.errors.name ? "border-red-500" : "border-gray-300"}`}
            />
            <div className="absolute top-[25px] right-0 bg-[#FF7DDD] rounded-md w-10 h-10 flex items-center justify-center">
              <FaRegUser className="text-white text-lg" />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative w-full max-w-sm">
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full px-4 py-2 pr-12 border rounded-md focus:outline-none ${formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            <div className="absolute top-[25px] right-0 bg-[#FF7DDD] rounded-md w-10 h-10 flex items-center justify-center">
              <AiOutlineMail className="text-white text-lg" />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="relative w-full max-w-sm">
            <label htmlFor="phonenumber" className="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phonenumber"
              name="phonenumber"
              placeholder="Enter your phone number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phonenumber}
              className={`w-full px-4 py-2 pr-12 border rounded-md focus:outline-none ${formik.touched.phonenumber && formik.errors.phonenumber ? "border-red-500" : "border-gray-300"}`}
            />
            <div className="absolute top-[25px] right-0 bg-[#FF7DDD] rounded-md w-10 h-10 flex items-center justify-center">
              <span className="text-white text-sm">📱</span>
            </div>
            {formik.touched.phonenumber && formik.errors.phonenumber && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.phonenumber}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative w-full max-w-sm">
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`w-full px-4 py-2 pr-10 border rounded-md focus:outline-none ${formik.touched.password && formik.errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[25px] right-0 bg-[#FF7DDD] rounded-md w-10 h-10 flex items-center justify-center text-white cursor-pointer"
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full max-w-sm bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md transition"
          >
            {formik.isSubmitting ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?
            <span onClick={() => navigate("/login")} className="text-pink-600 ml-1 cursor-pointer hover:underline">Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
