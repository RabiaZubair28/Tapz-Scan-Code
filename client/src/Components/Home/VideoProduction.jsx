import React from 'react';

function VideoProduction() {
  return (
    <div className="bg-[#f1f6f7] py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="flex flex-col space-y-4">
              <div className="bg-[#E7755F] w-12 h-12 rounded-full flex items-center justify-center">
                <img 
                  src="https://liamcrest.com/assets/static/divisions/icons/Asset%206.png"
                  alt="Video Production Icon"
                  className="w-8 h-8"
                />
              </div>
              <h2 className="text-[#16215c] text-4xl font-bold">Data Collection & Integration</h2>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed">
            Implement a robust three-tier architecture for enhanced scalability, data management, and system security. Gather and integrate university infrastructure, faculty, and student data.
            </p>

            <button className="bg-[#E7755F] text-white px-8 py-3 rounded-full 
              hover:bg-[#d06b4f] transition duration-300 ease-in-out">
              View Site
            </button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute -top-4 right-0 text-[#16215c] text-6xl font-bold opacity-20">
              04
            </div>
            <img 
              src="https://liamcrest.com/assets/static/divisions/VIDEO%20PRODUCTION.png"
              alt="Video Production Illustration"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoProduction;