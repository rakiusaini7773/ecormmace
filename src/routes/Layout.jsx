import React from "react";
import Sidebar from "../components/Sidebar/SideBar";
import SubHeader from "../components/common/SubHeader";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="w-full">
        <SubHeader />
      </div>

      {/* Content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md ">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 bg-[#F5F3F3] ">
          <Outlet />
        </div>
      </div>

      {/* Toast */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Layout;
