import React from 'react';

function SoftwareDevelopment() {
  return (
    <div className="relative flex justify-center items-center py-10 bg-[#16215c]">
      {/* Main Card */}
      <div className="flex flex-col md:flex-row items-center bg-[#1b2871] h-[550px] mx-32 shadow-lg relative">
        {/* Number Label - Top Right */}
        <div className="absolute top-8 right-8 text-white text-2xl font-light">
          02
        </div>

        {/* Image Section */}
        <div className="flex-1 mr-8">
          <img
            src="https://liamcrest.com/assets/static/divisions/WEB%20DEVELOPMENT.png"
            alt="Software Development illustration showing laptop with code and connected services"
            className="w-full h-auto pl-16 pb-12"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 ml-64 mb-16 text-center md:text-left mt-8 md:mt-0">
          <div className="flex justify-center md:justify-start items-center mb-4">
            <div className="w-10 h-10 bg-[#4A90E2] rounded-full flex justify-center items-center">
              <img
                src="https://liamcrest.com/assets/static/divisions/icons/Asset%204.png"
                alt="Software Development Logo"
                className="w-6 h-6"
              />
            </div>
          </div>
          <h2 className="text-[#4A90E2] text-2xl font-bold mb-4">Transparency & Reporting</h2>
          <p className="text-white mb-4">
          Provide detailed and transparent reporting features<br/> that allow accreditation bodies to monitor progress<br /> and outcomes efficiently.
          </p>
          <button className="bg-[#4A90E2] text-white py-2 px-4 rounded-full hover:bg-[#357abd] transition-colors">
            View Site
          </button>
        </div>
      </div>
    </div>
  );
}

export default SoftwareDevelopment;