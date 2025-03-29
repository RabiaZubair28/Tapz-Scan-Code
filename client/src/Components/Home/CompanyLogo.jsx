import React, { useState } from "react";
import one from "../../assets/logos/1.jpg";
import two from "../../assets/logos/2.jpg";
import three from "../../assets/logos/3.jpg";
import four from "../../assets/logos/4.jpg";
import five from "../../assets/logos/5.png";
import six from "../../assets/logos/6.png";
import seven from "../../assets/logos/7.jpg";
import eight from "../../assets/logos/8.png";
import nine from "../../assets/logos/9.jpg";
import ten from "../../assets/logos/10.jpg";
import eleven from "../../assets/logos/11.png";
import twelve from "../../assets/logos/12.jpg";
import thirteen from "../../assets/logos/13.png";
import fourteen from "../../assets/logos/14.png";
import fifteen from "../../assets/logos/15.jpg";
import sixteen from "../../assets/logos/16.jpg";
import seventeen from "../../assets/logos/17.png";
import eighteen from "../../assets/logos/18.png";
import ninteen from "../../assets/logos/19.jpg";
import twenty from "../../assets/logos/20.png";
import twentyone from "../../assets/logos/21.jpg";

// Define logos as an array of objects
const logos = [
  { src: one, alt: "Company 1" },
  { src: two, alt: "VFC" },
  { src: three, alt: "Company 2" },
  { src: four, alt: "Company 3" },
  { src: five, alt: "Intuit" },
  { src: six, alt: "Company 5" },
  { src: seven, alt: "Company 6" },
  { src: eight, alt: "Company 7" },
  { src: nine, alt: "Company 8" },
  { src: ten, alt: "Company 9" },
  { src: eleven, alt: "Company 10" },
  { src: twelve, alt: "Company 11" },
  { src: thirteen, alt: "Company 12" },
  { src: fourteen, alt: "Company 13" },
  { src: fifteen, alt: "Company 14" },
  { src: sixteen, alt: "Company 11" },
  { src: seventeen, alt: "Company 12" },
  { src: eighteen, alt: "Company 13" },
  { src: ninteen, alt: "Company 14" },
  { src: twenty, alt: "Company 11" },
];

function CompanyLogos() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className=" bg-[#f7f9fa] max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <h2 className="text-[25px] xs:text-[45px] sm:text-[45px] md:text-[45px] lg:text-[45px] xl:text-[45px] xxl:text-[45px] text-center mt-4 mb-6 xs:mb-6 sm:mb-6 md:mb-6 lg:mb-8 xl:mb-8 xxl:mb-8 xs:mt-4 sm:mt-6 md:mt-6 lg:mt-10 xl:mt-10 xxl:mt-10 font-bold text-[#16215c] ">
        Our Clients
      </h2>
      <div className="grid mx-6 xs:mx-16 sm:mx-16 md:mx-16 lg:mx-16 xl:mx-16 xxl:mx-16 grid-cols-4 md:grid-cols-3 lg:grid-cols-7 gap-y-2 xs:gap-y-8 sm:gap-y-8 md:gap-y-8 lg:gap-y-8 xl:gap-y-8 xxl:gap-y-8 gap-x-4 items-center justify-items-center">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="relative w-16 h-16 xs:w-40 xs:h-40 sm:w-40 sm:h-40 md:w-40 md:h-40 lg:w-40 lg:h-40 xl:w-40 xl:h-40 xxl:w-40 xxl:h-40 flex items-center justify-center"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`absolute inset-0 rounded-full bg-white shadow-lg transition-opacity duration-300 ${
                hoveredIndex === null || hoveredIndex === index
                  ? "opacity-100"
                  : "opacity-40"
              }`}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-full h-full object-contain p-1.5 xs:p-6  sm:p-6  md:p-6  lg:p-6  xl:p-6  xxl:p-6 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompanyLogos;
