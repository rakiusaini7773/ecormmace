import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, Search, User, Heart, ShoppingCart } from "lucide-react";
import { Drawer, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/slices/cartSlice"; // ✅ import fetchCart
import CartDrawer from "../CartDrawer";
import LogoImage from "../../images/logo1.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // ✅ Fetch cart globally when Navbar loads
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  
const cartItems = useSelector((state) => state.cart.items);
console.log("🟣 Navbar cartItems from Redux:", cartItems);
  // ✅ Select cart count from Redux
  const cartCount = useSelector((state) => {

    const items = state.cart.items || [];
    console.log('items', items)
    return items.reduce((acc, item) => acc + (item.quantity || 1), 0);
  });

  console.log('cartCount',cartCount)

  const navItems = [
    { label: "Product", path: "/product" },
    { label: "About", path: "/about" },
    { label: "Blogs", path: "/blogs" },
  ];

  const toggleMenuDrawer = () => setIsMenuDrawerOpen(!isMenuDrawerOpen);
  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  return (
    <nav className="bg-white border-b shadow-sm px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto relative flex items-center justify-between md:justify-start">

        {/* Mobile Menu Icon */}
        <div className="flex md:hidden items-center">
          <button onClick={toggleMenuDrawer}>
            {isMenuDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <Link to="/">
            <img src={LogoImage} alt="Logo" className="w-40 h-auto object-contain" />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-5 m-auto gap-6 mr-11">
          {navItems.map(({ label, path }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `text-lg font-semibold ${isActive ? "text-black" : "text-gray-700"} hover:text-black`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-2 ml-auto">
          <Search className="w-5 h-5 cursor-pointer" />
          <Link to="/login">
            <User className="w-5 h-5 cursor-pointer" />
          </Link>
          <div className="relative cursor-pointer" onClick={openCartDrawer}>
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <Drawer anchor="left" open={isMenuDrawerOpen} onClose={toggleMenuDrawer}>
        <div className="w-72 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Menu</h2>
            <IconButton onClick={toggleMenuDrawer}>
              <X className="w-5 h-5" />
            </IconButton>
          </div>
          <div className="flex flex-col space-y-4">
            {navItems.map(({ label, path }) => (
              <NavLink
                key={label}
                to={path}
                className={({ isActive }) =>
                  `text-sm ${isActive ? "text-black" : "text-gray-600"} hover:text-black`
                }
                onClick={toggleMenuDrawer}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </Drawer>

      {/* Cart Drawer */}
      <Drawer anchor="right" open={isCartDrawerOpen} onClose={closeCartDrawer}>
        <CartDrawer />
      </Drawer>
    </nav>
  );
};

export default Navbar;
