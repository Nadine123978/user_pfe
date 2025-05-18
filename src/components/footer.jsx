// Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 w-full px-6 py-10">
      {/* المحتوى الأساسي مقيد بعرض معين */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <h2 className="text-white text-2xl font-bold tracking-widest">SOCIETHY</h2>
          <p className="text-sm mt-4 leading-6">
            There are many variations of passages of Lorem Ipsum available,
            but the majority have suffered
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col gap-2">
          <span className="hover:text-white cursor-pointer">Home</span>
          <span className="hover:text-white cursor-pointer">About</span>
          <span className="hover:text-white cursor-pointer">Event</span>
          <span className="hover:text-white cursor-pointer">Blog</span>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col gap-2">
          <span className="hover:text-white cursor-pointer">FAQ</span>
          <span className="hover:text-white cursor-pointer">Careers</span>
          <span className="hover:text-white cursor-pointer">Our approach</span>
          <span className="hover:text-white cursor-pointer">Contact</span>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex items-start gap-2">
            <MdLocationOn className="text-lg mt-1" />
            <p>303 South Iorem Street,<br />Charlotte, NC</p>
          </div>
          <div className="flex items-center gap-2">
            <MdPhone className="text-lg" />
            <span>777-444-2220</span>
          </div>
          <div className="flex items-center gap-2">
            <MdEmail className="text-lg" />
            <span>Info@eventsociethy.com</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© 2023 All rights reserved by societhy</p>
        <div className="flex gap-4 mt-4 md:mt-0 text-lg">
          <FaFacebookF className="cursor-pointer hover:text-white" />
          <FaTwitter className="cursor-pointer hover:text-white" />
          <FaLinkedinIn className="cursor-pointer hover:text-white" />
          <FaYoutube className="cursor-pointer hover:text-white" />
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
