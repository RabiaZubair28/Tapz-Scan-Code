import React from "react";
import { Twitter, Linkedin, Facebook, Instagram, Youtube } from "lucide-react";
import logo2 from "../../assets/products/logo-Kittl.svg";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="relative z-20 bg-[#f7f9fa] py-8 font-chap">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 mb-8 text-center md:text-left">
          <h2 className="text-[#1F2C73] text-xl md:text-3xl font-bold leading-[1.6] max-w-2xl">
            Scan-Taps - The ultimate hub for NFC Products; Digital Business
            Cards, NFC Social-Media Cards, NFC Stands
          </h2>
        </div>

        {/* Navigation and Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-3 text-[#1F2C73]">
            <Link
              to="/contact"
              className="block text-primary font-semibold hover:opacity-80"
            >
              Our Location
            </Link>
            <Link
              to="/shop"
              className="block text-primary font-semibold hover:opacity-80"
            >
              Our Shop
            </Link>
            <Link
              to="/contact"
              className="block text-primary font-semibold hover:opacity-80"
            >
              Contact Us
            </Link>
          </div>

          <div className="text-[#1F2C73] space-y-1">
            <p>Doha - Qatar</p>
            <p>Scan-Taps Printing & Branding</p>
            <p>+974 3995 5738</p>
            <p>scanntap94@gmail.com</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 mt-8 text-[#1F2C73]">
          <div className="flex space-x-5 mb-6 md:mb-0">
            <a
              href="https://www.linkedin.com/company/106347260/admin/dashboard/"
              className="text-primary hover:opacity-80"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61568448604344"
              className="text-primary hover:opacity-80"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/tapz_scan/"
              className="text-primary hover:opacity-80"
            >
              <Instagram size={20} />
            </a>
          </div>

          <p className="text-primary text-[14px] text-center">
            Copyright © 2025, Scan-Tap - All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
