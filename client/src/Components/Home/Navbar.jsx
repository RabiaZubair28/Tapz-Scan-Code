import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import icons
import logos from "../../assets/products/logo-Kittl.svg";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [menuOpen]);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ease-in-out py-3 ${
        scrolled ? "bg-white/70 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logos} alt="Liam Crest" className="h-10" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {["Home", "Shop", "Contact"].map((label) => (
            <Link
              key={label}
              to={`/${label.toLowerCase().replace(" ", "-")}`}
              className={`transition-colors duration-300 font-medium ${
                scrolled ? "text-[#1F2C73]" : "text-[#1F2C73]"
              } hover:text-[#4B6FA6]`}
            >
              {label}
            </Link>
          ))}

          <Link
            to="/login"
            className={`px-6 py-3 rounded-lg  font-semibold text-center flex items-center space-x-2 transition-all duration-300 bg-[#B8D1E7] text-[#1F2C73] hover:bg-[#B8D1E7]`}
          >
            Already a Member? <br /> LOGIN
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#1F2C73] focus:outline-none"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu (Full Screen) */}
      {menuOpen && (
        <div
          className="fixed inset-0 w-screen h-screen  z-[1000] flex flex-col items-center justify-center space-y-6 transition-opacity duration-300"
          style={{
            backgroundImage:
              "url(https://liamcrest.com/assets/static/header/Asset%2072.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-[#1F2C73] focus:outline-none"
            onClick={() => setMenuOpen(false)}
          >
            <X size={30} />
          </button>
          <div className="flex flex-col justify-center items-center gap-y-6">
            <div className="flex flex-col justify-center items-center gap-y-4">
              {["Home", "Shop", "Contact"].map((label) => (
                <Link
                  key={label}
                  to={`/${label.toLowerCase().replace(" ", "-")}`}
                  className="text-xl font-semibold border-b-[1px] border-[#1F2C73] text-[#1F2C73] hover:text-[#4B6FA6] transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
            <Link
              to="/login"
              className={`px-6 py-3 rounded-lg  font-semibold text-center flex items-center space-x-2 transition-all duration-300 border-b-[1px] border-[#1F2C73] ${
                scrolled
                  ? "bg-[#1F2C73] text-white hover:bg-[#2B4C7E]"
                  : "bg-[#B8D1E7] text-[#1F2C73] hover:bg-[#A3C3E2]"
              }`}
            >
              Already a Member? LOGIN
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
