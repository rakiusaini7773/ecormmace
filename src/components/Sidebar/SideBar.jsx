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
  const [menuOpen, setMenuOpen] = useState(window.innerWidth >= 768);
  const [forceToggle, setForceToggle] = useState(window.innerWidth >= 768); // for manual toggle on small screens

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

  return (
    <div
      className={`flex flex-col ${
        menuOpen ? "w-64" : "w-20"
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
                  `group relative flex items-center gap-4 p-3 rounded-l-full transition-all duration-300 hover:bg-white hover:text-[#FF7DDD] hover:scale-[1.02] ${
                    isActive ? "bg-white text-[#FF7DDD]" : "text-white"
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
                  className={`text-base font-medium transition-all duration-200 ${
                    menuOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  }`}
                >
                  {item.name}
                </span>
              </NavLink>
            ))}
        </nav>

        <div className="mt-auto mb-6 space-y-2 sm:pl-4">
          <NavLink
            to="/login"
            onClick={() => {
              sessionStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="group relative flex items-center gap-4 p-3 rounded-b-full transition-all duration-300 hover:bg-white hover:text-[#FF7DDD] hover:scale-[1.02] text-white"
          >
            <LogOut className="w-5 h-5" />
            <span
              className={`text-base font-medium transition-all duration-200 ${
                menuOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
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
