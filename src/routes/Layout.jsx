import React from "react";
import Sidebar from "../components/Sidebar/SideBar";
import SubHeader from "../components/common/SubHeader";
import { Outlet } from "react-router-dom";

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
    </div>
  );
};

export default Layout;