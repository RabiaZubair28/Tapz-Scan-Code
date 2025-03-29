import React from 'react';

function GraphicDesign() {
  return (
    <div className="relative flex justify-center items-center  bg-[#16215c]">
      {/* Main Card */}
      <div className="flex flex-col md:flex-row items-center bg-[#1b2871] h-[550px]  mx-32  shadow-lg relative">
        {/* Number Label - Top Right */}
        <div className="absolute top-8 right-8 text-white text-2xl font-light">
          03
        </div>

        {/* Image Section */}
        <div className="flex-1 mr-8">
          <img
            src="https://liamcrest.com/assets/static/divisions/GRAPHIC%20DESIGN.png"
            alt="Graphic Design illustration showing laptop with design tools"
            className="w-full h-auto pl-16 pb-12"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 ml-64 mb-16 text-center md:text-left mt-8 md:mt-0">
          <div className="flex justify-center md:justify-start items-center mb-4">
            <div className="w-10 h-10 bg-[#E7755F] rounded-full flex justify-center items-center">
              <img
                src="https://liamcrest.com/assets/static/divisions/icons/Asset%203.png"
                alt="Graphic Design Logo"
                className="w-6 h-6"
              />
            </div>
          </div>
          <h2 className="text-[#E7755F] text-2xl font-bold mb-4">User-friendly Interface</h2>
          <p className="text-white mb-4">
          Offer an intuitive interface for faculty and accreditation bodies to easily access, manage, and analyze<br /> accreditation-related data
          </p>
          <button className="bg-[#E7755F] text-white py-2 px-4 rounded-full hover:bg-[#d66a55] transition-colors">
            View Site
          </button>
        </div>
      </div>
    </div>
  );
}

export default GraphicDesign;