import React, { useEffect, useState } from "react";

const SubHeader = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = sessionStorage.getItem("userRole");
    if (role) {
      setUserRole(role.toLowerCase());
    }
  }, []);

  return (
    <div className="bg-white shadow-md py-4 px-6 flex items-center justify-between relative">
      {/* Sidebar Width Indicator (Orange Bar) */}
      <div className="absolute left-0 top-0 h-full w-20 sm:w-64 bg-[#FF7DDD]"></div>

      {/* Left Section - Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-white relative z-10">
        {userRole === "admin" ? "Admin" : userRole === "sales" ? "Sales" : "Client"}
        
      </h1>

      
    </div>
  );
};

export default SubHeader;