import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/SideBar";


const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;