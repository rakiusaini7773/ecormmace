import React, { useState, useEffect } from "react";
import { Home } from "lucide-react";
import { useNavigate, useLocation, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { API_ENDPOINTS } from "../networking/apiConfig";
import { toast } from "react-toastify";
import BaseApiManager from "../networking/baseAPIManager";

// Dashboard Tab
const DashboardContent = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await BaseApiManager.get(API_ENDPOINTS.GET_USER_PROFILE);
        setUserData(data);
      } catch {
        toast.error("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (loading) return <div className="p-4">Loading account details...</div>;
  if (!userData) return <div className="p-4 text-red-600">Failed to load account details.</div>;

  const defaultAddress = userData.addresses?.find(addr => addr.isDefault) || userData.addresses?.[0];

  return (
    <div>
      <div className="p-4 border-b font-semibold">Account Details:</div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 text-sm">
          <div className="font-medium text-gray-700">Name:</div>
          <div className="md:col-span-2 text-gray-900">{userData.name}</div>

          <div className="font-medium text-gray-700">Email:</div>
          <div className="md:col-span-2 text-gray-900">{userData.email}</div>

          <div className="font-medium text-gray-700">Phone:</div>
          <div className="md:col-span-2 text-gray-900">{userData.phonenumber}</div>

          <div className="font-medium text-gray-700">Address:</div>
          <div className="md:col-span-2 text-gray-900">
            {defaultAddress ? (
              <>
                {defaultAddress.addressLine1} {defaultAddress.addressLine2} {defaultAddress.city}{defaultAddress.province}{" "}
                {defaultAddress.zipCode} {defaultAddress.country}
              </>
            ) : (
              "No address provided"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Orders Tab
const OrdersContent = () => (
  <div className="p-6">
    <h2 className="text-lg font-semibold mb-2">Order History</h2>
    <p className="text-sm text-gray-600">You have no orders yet.</p>
  </div>
);

// Address Form
const AddressForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", company: "", addressLine1: "", addressLine2: "",
    city: "", country: "India", province: "", zipCode: "", phone: "", isDefault: false,
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const indianStates = ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then((res) => res.json())
      .then((data) => {
        const countryNames = data.map((c) => c.name.common).sort((a, b) => a.localeCompare(b));
        setCountries(countryNames);
      });
  }, []);

  useEffect(() => {
    if (formData.country === "India") setStates(indianStates);
    else setStates([]);
  }, [formData.country]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await BaseApiManager.post(API_ENDPOINTS.ADD_USER_ADDRESS, formData);
      toast.success("Address saved successfully!");
      onClose();
    } catch {
      toast.error("Failed to save address.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <input name="firstName" placeholder="First Name" className="border px-3 py-2 rounded" onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" className="border px-3 py-2 rounded" onChange={handleChange} />
      <input name="company" placeholder="Company" className="border px-3 py-2 rounded col-span-2" onChange={handleChange} />
      <input name="addressLine1" placeholder="Address" className="border px-3 py-2 rounded col-span-2" onChange={handleChange} />
      <input name="addressLine2" placeholder="Apartment, suite, etc." className="border px-3 py-2 rounded col-span-2" onChange={handleChange} />
      <input name="city" placeholder="City" className="border px-3 py-2 rounded" onChange={handleChange} />
      <select name="country" className="border px-3 py-2 rounded" value={formData.country} onChange={handleChange}>
        {countries.map((country) => <option key={country}>{country}</option>)}
      </select>
      <select name="province" className="border px-3 py-2 rounded col-span-2" onChange={handleChange}>
        {states.length > 0 ? states.map((state) => <option key={state}>{state}</option>) : <option>No states available</option>}
      </select>
      <input name="zipCode" placeholder="Postal/Zip Code" className="border px-3 py-2 rounded col-span-2" onChange={handleChange} />
      <input name="phone" placeholder="Phone" className="border px-3 py-2 rounded col-span-2" onChange={handleChange} />
      <label className="flex items-center gap-2 col-span-2 mt-2">
        <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} />
        <span>Set as default address</span>
      </label>
      <button type="submit" className="bg-black text-white py-2 px-4 rounded col-span-2 mt-4">Save Address</button>
    </form>
  );
};

// Addresses Tab
const AddressesContent = () => {
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchAddresses = async () => {
    try {
      const res = await BaseApiManager.get(API_ENDPOINTS.GET_USER_PROFILE);
      setAddresses(res.addresses || []);
    } catch {
      toast.error("Failed to load addresses.");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    fetchAddresses();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Addresses</h2>
        {addresses.length === 0 && (
          <button className="bg-lime-500 hover:bg-lime-600 text-white text-sm px-4 py-2 rounded" onClick={() => setShowModal(true)}>
            ADD A NEW ADDRESS
          </button>
        )}
      </div>

      {addresses.length > 0 ? (
        <div className="grid gap-4">
          {addresses.map((addr) => (
            <div key={addr._id} className="border p-4 rounded text-sm bg-gray-50">
              <div className="font-semibold">{addr.firstName} {addr.lastName}</div>
              <div>{addr.company}</div>
              <div>{addr.addressLine1} {addr.addressLine2}</div>
              <div>{addr.city}, {addr.province} {addr.zipCode}</div>
              <div>{addr.country}</div>
              <div>Phone: {addr.phone}</div>
              {addr.isDefault && <div className="text-green-600 font-semibold mt-1">Default</div>}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600">No address saved.</p>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 relative">
            <button className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-2xl" onClick={handleCloseModal}>
              &times;
            </button>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
              <AddressForm onClose={handleCloseModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Account Component
const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabPath = location.pathname.split("/")[2] || "dashboard";
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const tabLabels = {
    dashboard: "Dashboard",
    orders: "Order History",
    addresses: "Addresses",
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("userId");
    toast.success("You have been logged out.");
    setShowLogoutModal(false);
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6 mt-10">
        <div className="flex items-center space-x-2 text-sm mb-6">
          <Home className="w-4 h-4" />
          <span className="text-gray-600">/</span>
          <span className="font-medium text-gray-700 capitalize">
            {tabLabels[tabPath] || "My Account"}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-sm divide-y text-sm font-semibold">
            {Object.keys(tabLabels).map((tab) => (
              <div
                key={tab}
                className={`p-4 cursor-pointer hover:bg-gray-100 ${tabPath === tab ? "bg-gray-100" : ""}`}
                onClick={() => navigate(`/account/${tab}`)}
              >
                {tabLabels[tab]}
              </div>
            ))}
            <div
              className="p-4 cursor-pointer hover:bg-gray-100 text-red-600"
              onClick={() => setShowLogoutModal(true)}
            >
              Logout
            </div>
          </div>

          <div className="md:col-span-2 border rounded-sm bg-white">
            <Routes>
              <Route path="dashboard" element={<DashboardContent />} />
              <Route path="orders" element={<OrdersContent />} />
              <Route path="addresses" element={<AddressesContent />} />
              <Route path="" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </div>
      <div className="mt-56">
        <Footer />
      </div>


      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold text-center mb-4">Confirm Logout</h2>
            <p className="text-center text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm rounded bg-gray-200 text-gray-600 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm rounded bg-pink-500 text-white hover:bg-pink-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
