import React, { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-[#c4a6ff] text-black px-6 py-10 text-sm">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto mb-8">
        <p className="mb-3 text-center">
          Stay up to date with our latest offers and product launches & be the
          first to get exclusive offers and sale information
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

      {/* Grid layout on md+ screens */}
      <div className="max-w-7xl mx-auto">
        <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Order & Support */}
          <div>
            <h4 className="font-semibold mb-2">Order & Support</h4>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Track My Order
                </a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold mb-2">Information</h4>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-semibold mb-2">Contact Us</h4>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Get in touch
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Store Locator
                </a>
              </li>
            </ul>
          </div>

          <div></div> {/* Empty for spacing */}
        </div>

        {/* Mobile Accordion View */}
        <div className="md:hidden space-y-2">
          {[
            {
              title: "Order & Support",
              id: "order",
              links: [{ label: "Track My Order", href: "#" }],
            },
            {
              title: "Information",
              id: "info",
              links: [
                { label: "Shipping & Returns", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
              ],
            },
            {
              title: "Contact Us",
              id: "contact",
              links: [
                { label: "Get in touch", href: "#" },
                { label: "Store Locator", href: "#" },
              ],
            },
          ].map((section) => (
            <div key={section.id} className="pb-2 border-b border-black">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex justify-between items-center font-semibold py-2"
              >
                {section.title}
                {openSection === section.id ? (
                  <MdOutlineKeyboardArrowUp className="text-xl" />
                ) : (
                  <MdOutlineKeyboardArrowDown className="text-xl" />
                )}
              </button>
              {openSection === section.id && (
                <ul className="mt-1 space-y-1 pl-1">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href={link.href} className="hover:underline">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Divider visible only on large screens */}
      <div className="hidden md:block border-t border-black my-8 max-w-7xl mx-auto"></div>
      <div className="px-8 sm:px-6 md:px-8">
        {/* Caution Notice */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h4 className="font-semibold py-4">Caution Notice</h4>
          <p>
            There's been an increase in scams through phone, SMS, WhatsApp,
            emails, and more.
          </p>
          <p>
            <strong>Please Note:</strong> Foxtale{" "}
            <strong>never asks for payments</strong> for products or promotional
            activities outside our official platform.
            <strong> We also do not ask for payments</strong> to join contests,
            lucky draws, or to get free gifts.
          </p>
          <p>
            If you get any suspicious messages, please be careful. You can{" "}
            <a
              href="mailto:info@foxtale.in"
              className="text-blue-600 underline"
            >
              contact our customer care
            </a>{" "}
            to check if it’s genuine.
          </p>
          <p>
            <strong>Report Fraud:</strong> If you suspect a scam, report it on
            the{" "}
            <a href="#" className="text-blue-600 underline">
              Chakshu Portal
            </a>{" "}
            to the <strong>Department of Telecommunications (DOT)</strong>.
          </p>
          <p>Stay safe and protect your information.</p>
        </div>

        {/* Divider */}
        <div className="border-t border-black my-8 max-w-7xl mx-auto"></div>

        {/* Social Icons */}
        <div className="text-center space-y-4">
          <div className="flex justify-center gap-4">
            <a href="#">
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="#">
              <i className="fab fa-youtube text-xl"></i>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 text-center text-xs">
          <p>&copy; 2025 Foxtale Cosmetics. All rights reserved.</p>
          <p className="mt-1">
            Upto <strong>15% Off</strong> on all products{" "}
            <span className="text-purple-800">[Code: DETAN15]</span>
          </p>
        </div>
      </div>

    </footer>
  );
}