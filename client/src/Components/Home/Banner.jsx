import React from 'react';
import ss from "../../assets/ss.png"
function Banner() {
  return (
    <div className="relative flex flex-col bg-blue-50">
      <img
        src={ss}
        alt="Office scene with people collaborating and analyzing data"
        className="w-full h-auto mt-auto"
      />
    </div>
  );
}

export default Banner;