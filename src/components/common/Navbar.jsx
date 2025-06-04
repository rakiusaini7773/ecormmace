import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  User,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Drawer, IconButton } from "@mui/material";
import CartDrawer from "../CartDrawer";
import LikeDrawer from "../LikeDrawer";

const Navbar = () => {
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isLikeDrawerOpen, setIsLikeDrawerOpen] = useState(false);

  const cartCount = useSelector((state) => state.cart.items.length);
  const likeCount = useSelector((state) => state.like.likedItems.length);

  const toggleMenuDrawer = () => setIsMenuDrawerOpen(!isMenuDrawerOpen);
  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);
  const openLikeDrawer = () => setIsLikeDrawerOpen(true);
  const closeLikeDrawer = () => setIsLikeDrawerOpen(false);

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
          {["/", "/product", "/about", "/blog"].map((path, i) => {
            const labels = ["HOME", "Products", "ABOUT", "BLOG"];
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

          {/* Like Icon */}
          <div className="relative cursor-pointer" onClick={openLikeDrawer}>
            <Heart className="w-5 h-5" />
            {likeCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
                {likeCount}
              </span>
            )}
          </div>

          {/* Cart Icon */}
          <div className="relative cursor-pointer" onClick={openCartDrawer}>
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </div>

          {/* Hamburger for mobile */}
          <button className="lg:hidden" onClick={toggleMenuDrawer}>
            {isMenuDrawerOpen ? (
              <X className="w-6 h-6 " />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer anchor="left" open={isMenuDrawerOpen} onClose={toggleMenuDrawer}>
        <div className="w-72 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Menu</h2>
            <IconButton onClick={toggleMenuDrawer}>
              <X className="w-5 h-5" />
            </IconButton>
          </div>
          <div className="flex flex-col space-y-4">
            {["/", "/product", "/about", "/blog"].map((path, i) => {
              const labels = ["HOME", "Products", "ABOUT", "BLOG"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `${linkClass} ${isActive ? activeClass : ""}`
                  }
                  onClick={toggleMenuDrawer}
                >
                  {labels[i]}
                </NavLink>
              );
            })}
          </div>
        </div>
      </Drawer>

      {/* Cart Drawer */}
      <Drawer anchor="right" open={isCartDrawerOpen} onClose={closeCartDrawer}>
        <CartDrawer />
      </Drawer>

      {/* Like Drawer */}
      <Drawer anchor="right" open={isLikeDrawerOpen} onClose={closeLikeDrawer}>
        <LikeDrawer />
      </Drawer>
    </nav>
  );
};

export default Navbar;
