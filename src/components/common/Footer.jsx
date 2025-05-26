import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#c4a6ff] text-black px-6 py-10 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Column 1 */}
        <div>
          <h4 className="font-semibold mb-2">Order & Support</h4>
          <ul>
            <li><a href="#" className="hover:underline">Track My Order</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="font-semibold mb-2">Information</h4>
          <ul>
            <li><a href="#" className="hover:underline">Shipping & Returns</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="font-semibold mb-2">Contact Us</h4>
          <ul>
            <li><a href="#" className="hover:underline">Get in touch</a></li>
            <li><a href="#" className="hover:underline">Store Locator</a></li>
          </ul>
        </div>

        {/* Column 4 - Newsletter */}
        <div>
          <p className="mb-3">
            Stay up to date with our latest offers and product launches & be the first to get exclusive offers and sale information
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 p-2 rounded-l-md border border-gray-300"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 rounded-r-md font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-black my-8 max-w-7xl mx-auto"></div>

      {/* Caution Notice */}
      <div className="text-center space-y-2">
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

      {/* Branding and Social */}
      <div className="text-center space-y-4">
        
        <div className="flex justify-center gap-4">
          <a href="#" aria-label="Facebook"><i className="fab fa-facebook text-xl"></i></a>
          <a href="#" aria-label="Instagram"><i className="fab fa-instagram text-xl"></i></a>
          <a href="#" aria-label="YouTube"><i className="fab fa-youtube text-xl"></i></a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 text-center text-xs ">
        <p>&copy; 2025 Foxtale Cosmetics. All rights reserved.</p>
        <p className="mt-1">Upto <strong>15% Off</strong> on all products <span className="text-purple-800">[Code: DETAN15]</span></p>
      </div>
    </footer>
  );
}