import React, { useState } from "react";

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <footer className="bg-[#c4a6ff] text-black px-6 py-10 text-sm">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto mb-8">
        <p className="mb-3 text-center">
          Stay up to date with our latest offers and product launches & be the first to get exclusive offers and sale information
        </p>
        <form className="flex flex-col sm:flex-row max-w-md mx-auto bg-white border border-black rounded-md overflow-hidden">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 p-2 text-black outline-none"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 font-semibold"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Grid layout on md+ screens, accordion layout on mobile */}
      <div className="max-w-7xl mx-auto">
        <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Order & Support */}
          <div>
            <h4 className="font-semibold mb-2">Order & Support</h4>
            <ul>
              <li><a href="#" className="hover:underline">Track My Order</a></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold mb-2">Information</h4>
            <ul>
              <li><a href="#" className="hover:underline">Shipping & Returns</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-semibold mb-2">Contact Us</h4>
            <ul>
              <li><a href="#" className="hover:underline">Get in touch</a></li>
              <li><a href="#" className="hover:underline">Store Locator</a></li>
            </ul>
          </div>

          {/* Spacer (Column 4 is Newsletter shown above) */}
          <div></div>
        </div>

        {/* Accordion view for mobile only */}
        <div className="md:hidden space-y-4">
          {/* Section 1 */}
          <div>
            <button
              onClick={() => toggleSection("order")}
              className="w-full flex justify-between items-center font-semibold border-b border-black py-2"
            >
              Order & Support
              <span>{openSection === "order" ? "−" : "+"}</span>
            </button>
            {openSection === "order" && (
              <ul className="mt-2 pl-2 space-y-1">
                <li><a href="#" className="hover:underline">Track My Order</a></li>
              </ul>
            )}
          </div>

          {/* Section 2 */}
          <div>
            <button
              onClick={() => toggleSection("info")}
              className="w-full flex justify-between items-center font-semibold border-b border-black py-2"
            >
              Information
              <span>{openSection === "info" ? "−" : "+"}</span>
            </button>
            {openSection === "info" && (
              <ul className="mt-2 pl-2 space-y-1">
                <li><a href="#" className="hover:underline">Shipping & Returns</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms of Service</a></li>
              </ul>
            )}
          </div>

          {/* Section 3 */}
          <div>
            <button
              onClick={() => toggleSection("contact")}
              className="w-full flex justify-between items-center font-semibold border-b border-black py-2"
            >
              Contact Us
              <span>{openSection === "contact" ? "−" : "+"}</span>
            </button>
            {openSection === "contact" && (
              <ul className="mt-2 pl-2 space-y-1">
                <li><a href="#" className="hover:underline">Get in touch</a></li>
                <li><a href="#" className="hover:underline">Store Locator</a></li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-black my-8 max-w-7xl mx-auto"></div>

      {/* Caution Notice */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h4 className="font-semibold">Caution Notice</h4>
        <p>There's been an increase in scams through phone, SMS, WhatsApp, emails, and more.</p>
        <p>
          <strong>Please Note:</strong> Foxtale <strong>never asks for payments</strong> for products or promotional activities outside our official platform.
          <strong> We also do not ask for payments</strong> to join contests, lucky draws, or to get free gifts.
        </p>
        <p>
          If you get any suspicious messages, please be careful. You can
          <a href="mailto:info@foxtale.in" className="text-blue-600 underline"> contact our customer care</a> to check if it’s genuine.
        </p>
        <p>
          <strong>Report Fraud:</strong> If you suspect a scam, report it on the
          <a href="#" className="text-blue-600 underline"> Chakshu Portal</a> to the <strong>Department of Telecommunications (DOT)</strong>.
        </p>
        <p>Stay safe and protect your information.</p>
      </div>

      {/* Divider */}
      <div className="border-t border-black my-8 max-w-7xl mx-auto"></div>

      {/* Social Icons */}
      <div className="text-center space-y-4">
        <div className="flex justify-center gap-4">
          <a href="#"><i className="fab fa-facebook text-xl"></i></a>
          <a href="#"><i className="fab fa-instagram text-xl"></i></a>
          <a href="#"><i className="fab fa-youtube text-xl"></i></a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 text-center text-xs">
        <p>&copy; 2025 Foxtale Cosmetics. All rights reserved.</p>
        <p className="mt-1">
          Upto <strong>15% Off</strong> on all products <span className="text-purple-800">[Code: DETAN15]</span>
        </p>
      </div>
    </footer>
  );
}
