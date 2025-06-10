import React from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Sidebar from '../components/Sidebar/SideBar';

const PrivateLayout = () => {
  
    return (
        <div>
            <Header profileImage={"profileImage"} profileName={"profileName"} />
            <Sidebar />
            <div>
                {/* {isLogin ? <Outlet context={{ "onProfileUpdate" }} /> : navigate("/signin")} */}
            </div>
        </div>
    );
}

export default PrivateLayout;