import { useState } from "react";
import { Menu, X, Search, User, Heart, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const linkClass =
    "text-gray-500 hover:text-black hover:underline text-sm font-medium tracking-wider transition";
  const activeClass = "text-black underline";

  return (
    <nav className="bg-white shadow-sm px-4 py-2 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold tracking-wide">
          THE <span className="font-extrabold">FACE SHOP</span>
          <div className="text-xs tracking-widest">CLEAN BEAUTY</div>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          {["/",  "/product" ,"/about", "/blog",].map((path, i) => {
            const labels = ["HOME",  "Products" , "ABOUT", "BLOG",];
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                {labels[i]}
              </NavLink>
            );
          })}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 cursor-pointer" />
          <User className="w-5 h-5 cursor-pointer" />
          <Heart className="w-5 h-5 cursor-pointer" />
          <ShoppingCart className="w-5 h-5 cursor-pointer" />
          {/* Hamburger */}
          <button className="lg:hidden" onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden flex flex-col space-y-3 mt-3 text-sm font-medium tracking-wider">
          {["/",  "/skincare" ,"/about", "/blog",].map((path, i) => {
            const labels = ["HOME",  "SKINCARE" ,"ABOUT", "BLOG",];
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                {labels[i]}
              </NavLink>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
