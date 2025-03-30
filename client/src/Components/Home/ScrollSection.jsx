import { useEffect, useRef } from "react";
import siba from "../../assets/logos/video.mp4";
import net from "../assets/products/crinkle.jpg";
export default function ScrollSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative bg-[#16215c] pt-6 xs:pt-6 sm:pt-6 md:pt-6 lg:pt-6 xl:pt-6 xxl:pt-6"
    >
      {/* Background pattern */}
      <div className="absolute inset-0">
        <img
          src="https://liamcrest.com/assets/static/header/Asset%2073.png"
          alt="Background Pattern"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row xxl:flex-row items-center justify-center max-w-[2000px] mx-auto px-4 xs:px-16 sm:px-16 md:px-16 lg:px-24 xl:px-24 xxl:px-24 gap-6 xs:gap-12 sm:gap-12 md:gap-12 lg:gap-24 xl:gap-24 xxl:gap-24 relative z-20">
        {/* Left Side (Text) */}
        <div className="text-white space-y-2 xs:space-y-2 sm:space-y-2  md:space-y-2  lg:space-y-8  xl:space-y-8 xxl:space-y-8   w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
          <h2 className="text-[25px] xs:text-[25px] sm:text-[25px] md:text-[25px] lg:text-[65px] xl:text-[65px] xxl:text-[65px] font-bold leading-[40px] xs:leading-[40px] sm:leading-[40px] md:leading-[40px] lg:leading-[80px] xl:leading-[80px] xxl:leading-[80px]">
            Scan-Tap <br />
            The Pioneers of NFC Products around Qatar.
          </h2>
          <p className="text-sm xs:text-sm sm:text-sm md:text-sm lg:text-xl xl:text-xl xxl:text-xl text-blue-200 leading-7 xs:leading-8 sm:leading-8 md:leading-8 lg:leading-10 xl:leading-10 xxl:leading-10">
            ScanTaps NFC products make connecting and sharing effortlessly, just
            tap and go to exchange information instantly. It has a variety of
            products including NFC Digital Business Card, NFC Stand, NFC
            Social-Media Card, and NFC Sticker.
          </p>
        </div>

        {/* Right Side (Video) */}
        <div className="w-full xs:w-full sm:w-full md:w-full lg:w-[580px] xl:w-[580px] xxl:w-[580px] h-[400px] xs:h-[400px] sm:h-[500px] md:h-[600px] lg:h-[600px] xl:h-[600px] xxl:h-[600px]  rounded-lg xs:rounded-2xl sm:rounded-2xl md:rounded-2xl lg:rounded-2xl xl:rounded-2xl xxl:rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 flex flex-col">
          <img src={net} className="w-full h-full object-cover" />

          {/* <hr className="h-[1px] w-full text-blue-300 bg-blue-300 mt-5" /> */}
        </div>
      </div>
    </div>
  );
}
