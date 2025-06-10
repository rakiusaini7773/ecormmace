

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Image as BannerIcon,
  Tag as OffersIcon,
  ShoppingBag as ProductIcon,
  LayoutGrid as CategoryIcon,
  Newspaper as BlogIcon,
   LogOut,
  Menu,
} from "lucide-react";

const Sidebar = () => {
  const [userRole, setUserRole] = useState("");
  const [menuOpen, setMenuOpen] = useState(window.innerWidth >= 768); // Start open on large screens

  useEffect(() => {
    const role = sessionStorage.getItem("userRole");
    if (role) {
      setUserRole(role.toLowerCase());
    }

    // Auto-collapse on small screens
    const handleResize = () => {
      setMenuOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

const menuItems = [
  {
    name: "Banner",
    path: "/admin/banner",
    icon: <BannerIcon className="w-5 h-5" />,
    type: "admin",
  },
  {
    name: "Offers Card",
    path: "/admin/offers",
    icon: <OffersIcon className="w-5 h-5" />,
    type: "admin",
  },
  {
    name: "Product",
    path: "/admin/products",
    icon: <ProductIcon className="w-5 h-5" />,
    type: "admin",
  },
  {
    name: "Category",
    path: "/admin/categories",
    icon: <CategoryIcon className="w-5 h-5" />,
    type: "admin",
  },
  {
    name: "Blogs",
    path: "/admin/blogs",
    icon: <BlogIcon className="w-5 h-5" />,
    type: "admin",
  },
];

  return (
    <div
      className={`flex flex-col  ${
        menuOpen ? "w-64" : "w-20"
      }  bg-[#FF7DDD] text-white relative rounded-b-4xl transition-all duration-300 `} style={{ height: "100vh" }}
    >
   

      <div
        key={userRole}
        className="sidebar-container flex flex-col flex-1 "
      >
        {/* Menu Items */}{" "}
        <button onClick={toggleMenu} className="ml-4 md:hidden ">
          <Menu className="w-6 h-6 text-white" />
        </button>
        <nav className="mt-6 sm:mt-10 space-y-2 sm:pl-6">
          {menuItems
            .filter((item) => item.type === userRole) // Show only items matching userRole
            .map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={({ isActive }) =>
                  `group relative flex items-center gap-4 p-3 rounded-l-full transition-all duration-300 ${
                    isActive
                      ? "bg-[#EFEFEF] text-orange-500 shadow-lg"
                      : "text-white"
                  }`
                }
              >
                <div>{item.icon}</div>
                <span
                  className={`text-base font-medium ${
                    menuOpen ? "block" : "hidden"
                  }`}
                >
                  {item.name}
                </span>
              </NavLink>
            ))}
        </nav>
        {/* Logout Section */}
        <div className="mb-6 space-y-2 sm:pl-6">
          <NavLink
            to="/login"
            onClick={() => {
              sessionStorage.removeItem("token"); // Remove token from sessionStorage
              window.location.href = "/login"; // Redirect to login page
            }}
            className={({ isActive }) =>
              `group relative flex items-center gap-4 p-3 rounded-b-full transition-all duration-300 ${
                isActive
                  ? "bg-white text-black shadow-lg": "text-white  "
                  
              }`
            }
          >
            <LogOut className="w-5 h-5" />
            <span
              className={`text-base font-medium ${
                menuOpen ? "block" : "hidden"
              }`}
            >
              Logout
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;