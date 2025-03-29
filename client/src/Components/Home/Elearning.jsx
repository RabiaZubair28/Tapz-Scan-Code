import React from 'react';

function ElearningWorksheets() {
  return (
    <div className="bg-[#f1f6f7] px-4 sm:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="flex flex-col space-y-4">
              <div className="bg-[#ADDCEC] w-12 h-12 rounded-full flex items-center justify-center">
                <img 
                  src="https://liamcrest.com/assets/static/divisions/icons/Asset%201.png"
                  alt="eLearning Worksheets Icon"
                  className="w-8 h-8"
                />
              </div>
              <h2 className="text-[#16215c] text-4xl font-bold">Feedback Analysis</h2>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed">
            Enable real-time analysis and feedback, ensuring timely adjustments and improvements in educational programs.
            </p>

            <button className="bg-[#ADDCEC] text-white px-8 py-3 rounded-full 
              hover:bg-[#9CC8D8] transition duration-300 ease-in-out">
              View Site
            </button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute -top-4 right-0 text-[#16215c] text-6xl font-bold opacity-20">
              05
            </div>
            <img 
              src="https://liamcrest.com/assets/static/divisions/WORKSHEETS.png"
              alt="eLearning Worksheets Illustration"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElearningWorksheets;