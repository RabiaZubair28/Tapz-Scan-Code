import React from "react";
import contact from "../../assets/logos/s-card-1.jpg";
import { Link } from "react-router-dom";
function Seemore() {
  return (
    <div
      className="relative flex items-start xs:items-center sm:items-center md:items-center lg:items-center xl:items-center xxl:items-center  justify-start h-[450px] xs:h-[450px] sm:h-[450px] md:h-[450px] lg:h-[500px] xl:h-[500px] xxl:h-[500px] bg-cover bg-center px-8 -pb-12"
      style={{
        backgroundImage:
          "url('https://liamcrest.com/assets/static/footer/FOOTER-01.png')",
        fontFamily: "Chap, sans-serif", // Ensure Chap font is added in your project
      }}
    >
      {/* Main Content */}
      <div className="z-10 mb-64 ml-3 xs:ml-32 sm:ml-32 md:ml-32 lg:ml-32 xl:ml-32 xxl:ml-32">
        <h1 className="text-[22px] xs:text-[45px] sm:text-[45px] md:text-[45px] lg:text-[45px] xl:text-[45px] xxl:text-[45px] font-bold text-blue-900 leading-tight pt-12 xs:pt-12 sm:pt-12 md:pt-12 lg:pt-0 xl:pt-0 xxl:pt-0">
          Do you want to see more?
        </h1>
        <a href="/contact">
          <button className="mt-4 px-8  py-2 bg-[#ADDCEC] text-blue-900 font-medium rounded-md shadow-md transition-colors duration-300 ml-0 md:ml-2">
            <Link to="/contact">Contact Us</Link>
          </button>
        </a>
      </div>

      {/* Overlay Section */}
      {/* <div className="absolute top-1/4 right-10 mb-16 me-48 transform -translate-y-1/2 h-[300px] w-[400px] bg-white/90 rounded-lg shadow-lg flex items-center justify-center">
      
      <div className="relative  w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
        <img
          src={contact} // Replace with your actual image or video thumbnail
          alt="Compliance Training"
          className="absolute  inset-0 w-full h-full object-cover opacity-100"
        />
      
      </div>
    </div> */}
    </div>
  );
}

export default Seemore;
