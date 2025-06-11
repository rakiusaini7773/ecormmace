import React from "react";
import Sidebar from "../components/Sidebar/SideBar";
import SubHeader from "../components/common/SubHeader";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div className="main-container">
      <div className="header">
        <SubHeader />
      </div>
      <div className="content flex">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main-outlet flex-1 p-4 bg-[#F5F3F3]">
          <Outlet />
        </div>
      </div>

      {/* Toast notifications - placed globally */}
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
