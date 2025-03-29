import React from 'react';
import { ArrowDown } from 'lucide-react';

function CompilanceTraining() {
  return (
    <div className="relative flex justify-center items-center bg-[#16215c]">
      {/* Main Card */}
      <div className="flex flex-col md:flex-row items-center bg-[#1b2871] h-[550px] mx-32 shadow-lg relative">
        {/* Number Label - Top Right */}
        <div className="absolute top-8 right-8 text-white text-2xl font-light">
          01
        </div>

        {/* Image Section */}
        <div className="flex-1 mr-8">
          <img
            src="https://liamcrest.com/assets/static/divisions/COM-TRAINING.png"
            alt="Illustration of books, a graduation cap, a mobile phone, and other educational items"
            className="w-full h-auto pl-16 pb-12"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 ml-64 mb-16 text-center md:text-left mt-8 md:mt-0">
          <div className="flex justify-center md:justify-start items-center mb-4">
            <div className="w-10 h-10 bg-[#e7755f] rounded-full flex justify-center items-center">
              <img
                src="https://liamcrest.com/assets/static/divisions/icons/Asset%205.png"
                alt="Compliance Training Logo"
                className="w-6 h-6"
              />
            </div>
          </div>
          <h2 className="text-[#F27C48] text-2xl font-bold mb-4">Outcome-Based Analysis</h2>
          <p className="text-white mb-4">
          Support outcome-based education by providing<br/>tools for evaluating program effectiveness based<br/> on PLOs and CLOs.
          </p>
          <button className="bg-[#F27C48] text-white py-2 px-4 rounded-full hover:bg-[#e06b3a] transition-colors">
            View Site
          </button>
        </div>

      
      </div>
    </div>
  );
}

export default CompilanceTraining;