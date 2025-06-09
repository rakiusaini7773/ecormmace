import React from "react";
import Sidebar from "../components/Sidebar/SideBar";
import SubHeader from "../components/common/SubHeader";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
   <>   
<div className="main-container">
  <div className="header">
    <SubHeader />
  </div>
  <div className="content">
    <div className="sidebar">
      <Sidebar />
    </div>
    <div className="main-outlet">
      <Outlet />
    </div>
  </div>
</div>

   {/* <SubHeader />
        <Sidebar />
   
        
   
      <Outlet /> */}
       
      </>
  );
};

export default Layout;