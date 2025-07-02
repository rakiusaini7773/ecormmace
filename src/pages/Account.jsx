import React, { useState } from "react";
import { Home } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Account = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="p-4 border-b font-semibold">Account Details:</div>
        );
      case "orders":
        return (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Order History</h2>
            <p className="text-sm text-gray-600">You have no orders yet.</p>
          </div>
        );
      case "addresses":
        return (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Your Addresses</h2>
            <p className="text-sm text-gray-600">No address saved.</p>
          </div>
        );
      case "logout":
        return (
          <div className="p-4 text-red-600 font-semibold">You have logged out.</div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm mb-6">
          <Home className="w-4 h-4" />
          <span className="text-gray-600">/</span>
          <span className="font-medium text-gray-700">My Account</span>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="border rounded-sm divide-y text-sm font-semibold">
            <div
              className={`p-4 cursor-pointer hover:bg-gray-100 ${
                activeTab === "dashboard" && "bg-gray-100"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </div>
            <div
              className={`p-4 cursor-pointer hover:bg-gray-100 ${
                activeTab === "orders" && "bg-gray-100"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Order History
            </div>
            <div
              className={`p-4 cursor-pointer hover:bg-gray-100 ${
                activeTab === "addresses" && "bg-gray-100"
              }`}
              onClick={() => setActiveTab("addresses")}
            >
              Addresses
            </div>
            <div
              className="p-4 cursor-pointer hover:bg-gray-100 text-red-600"
              onClick={() => setActiveTab("logout")}
            >
              Logout
            </div>
          </div>

          {/* Dynamic Right Side Content */}
          <div className="md:col-span-2 border rounded-sm">
            {activeTab === "dashboard" && (
              <div>
                <div className="p-4 border-b font-semibold">Account Details:</div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 text-sm">
                    <div className="font-medium text-gray-700">Name:</div>
                    <div className="md:col-span-2 text-gray-900">User Name</div>

                    <div className="font-medium text-gray-700">Email:</div>
                    <div className="md:col-span-2 text-gray-900">
                      sainiravindra369@gmail.com
                    </div>

                    <div className="font-medium text-gray-700">Address:</div>
                    <div className="md:col-span-2 text-gray-900">
                      No address provided
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab !== "dashboard" && renderContent()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
