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
import { HiOutlineUserCircle } from "react-icons/hi";

const Sidebar = () => {
  const [userRole, setUserRole] = useState("");
  const [menuOpen, setMenuOpen] = useState(window.innerWidth >= 768);
  const [forceToggle, setForceToggle] = useState(window.innerWidth >= 768); // for manual toggle on small screens
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const role = sessionStorage.getItem("userRole");
    if (role) {
      setUserRole(role.toLowerCase());
    }

    const handleResize = () => {
      const isLarge = window.innerWidth >= 768;
      setMenuOpen(isLarge);
      setForceToggle(isLarge);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setForceToggle((prev) => !prev);
    setMenuOpen((prev) => !prev);
  };

  const menuItems = [
    { name: "Banner", path: "/admin/banner", icon: <BannerIcon className="w-5 h-5" />, type: "admin" },
    { name: "Offers Card", path: "/admin/offers", icon: <OffersIcon className="w-5 h-5" />, type: "admin" },
    { name: "User", path: "/admin/user", icon: <HiOutlineUserCircle className="w-5 h-5" />, type: "admin" },
    { name: "Product", path: "/admin/products", icon: <ProductIcon className="w-5 h-5" />, type: "admin" },
    { name: "Category", path: "/admin/categories", icon: <CategoryIcon className="w-5 h-5" />, type: "admin" },
    { name: "Blogs", path: "/admin/blogs", icon: <BlogIcon className="w-5 h-5" />, type: "admin" },

  ];

  const handleMouseEnter = () => {
    if (!forceToggle && window.innerWidth >= 768) {
      setMenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!forceToggle && window.innerWidth >= 768) {
      setMenuOpen(false);
    }
  };


   const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  return (
    <div
      className={`flex flex-col ${menuOpen ? "w-64" : "w-20"
        } bg-[#FF7DDD] text-white relative transition-all duration-300 ease-in-out`}
      style={{ height: "100%" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Toggle Button */}
      <div className="p-4 md:hidden">
        <button onClick={toggleMenu}>
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex flex-col flex-1">
        <nav className="mt-4 sm:mt-10 space-y-2 sm:pl-4">
          {menuItems
            .filter((item) => item.type === userRole)
            .map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={({ isActive }) =>
                  `group relative flex items-center gap-4 p-3 rounded-l-full transition-all duration-300 hover:bg-white hover:text-[#FF7DDD] hover:scale-[1.02] ${isActive ? "bg-white text-[#FF7DDD]" : "text-white"
                  }`
                }
              >
                <div className="relative group">
                  {item.icon}
                  {!menuOpen && (
                    <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </div>
                <span
                  className={`text-base font-medium transition-all duration-200 ${menuOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                    }`}
                >
                  {item.name}
                </span>
              </NavLink>
            ))}
        </nav>

        <div className="mt-auto mb-6 space-y-2 sm:pl-4">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="group relative flex items-center gap-4 p-3 rounded-l-full transition-all duration-300  hover:bg-white hover:text-[#FF7DDD] hover:scale-[1.02] text-white"
        >
          <LogOut className="w-5 h-5" />
          <span
            className={`text-base font-medium transition-all duration-200 ${
              menuOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            Logout
          </span>
        </button>
      </div>

      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <div className="text-center">
              <p className="text-gray-700 text-lg mb-6">Are you sure you want to logout?</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-4 py-2 text-sm rounded bg-gray-200 text-gray-600 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm rounded bg-pink-400 text-white hover:bg-pink-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Sidebar;
