import { useState, useEffect } from "react";
import ScrollSection from "./ScrollSection.jsx";
import CompilanceTraining from "./CompilanceTraining.jsx";
import SoftwareDevelopment from "./SoftwareDevelopment.jsx";
import GraphicDesign from "./GraphicDesign.jsx";
import Banner from "./Banner.jsx";
import { Link } from "react-router-dom";
import VideoProduction from "./VideoProduction.jsx";
import Elearning from "./Elearning.jsx";
import CompanyLogo from "./CompanyLogo.jsx";
import Seemore from "./Seemore.jsx";
import Footer from "./Footer.jsx";
import WaveBackground02 from "../Working/WaveBackground02.jsx";
import Navbar from "./Navbar.jsx";
import PricingSection from "../../Components/Working/PricingSection.jsx";
import Carousal from "../Working/Carousal.jsx";
import Gallery from "../../Components/Gallery/Gallery.jsx";
import StatsSection from "../Working/StatsSection.jsx";
import ScaleLoader from "react-spinners/ScaleLoader";
export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page load delay
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Show loader for 2 seconds
  }, []);
  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setIsLoading(false), 1500);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {loading ? (
        <div
          className={`min-h-screen w-full max-w-md mx-auto shadow-lg pb-5 text-center flex justify-center align-center bg-gradient-to-tr from-[#16215c] via-[#16215c] to-[#16215c] pt-[25%]`}
          style={{ backgroundAttachment: "fixed" }}
        >
          <ScaleLoader
            color={"white"}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="bg-[#16215c] ">
          {/* Loading Animation */}
          <Navbar />

          <div className="relative">
            <div
              className="flex flex-col lg:flex-col xl:flex-col sm:flex-row xxl:flex-row relative overflow-hidden hero-background"
              style={{
                backgroundImage:
                  "url(https://liamcrest.com/assets/static/header/Asset%2072.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark Overlay Animation */}
              <div
                className="absolute inset-0 z-[1] bg-[#1F2C73] transition-transform duration-[2000ms]"
                style={{
                  transform: `translateY(${Math.min(
                    100 + scrollPosition / 5,
                    200
                  )}%)`,
                }}
              />

              {/* Right Side (Text Content) */}
              <div
                className={`flex flex-col justify-center items-between xs:items-between sm:items-between md:items-between lg:items-end xl:items-end xxl:items-end text-center w-full xs:w-full sm:w-full md:w-full lg:w-full xl:w-full xxl:w-full font-serif transform transition-all duration-1000 delay-700 relative z-[2] pe-0  xs:pe-0 sm:pe-0 md:pe-0 lg:pe-[12%] xl:pe-[12%] xxl:pe-[12%] ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
                style={{
                  transform: `translateY(${-scrollPosition * 0.3}px)`,
                  opacity: Math.max(1 - scrollPosition * 0.002, 0),
                }}
              >
                <div className="font-bold tracking-normal text-[#1F2C73] mt-32 xs:mt-32 sm:mt-32 md:mt-32 lg:mt-48 xl:mt-48 xxl:mt-48">
                  <div className="text-[40px] xxl:text-[55px] xl:text-[55px] lg:text-[55px] md:text-[45px] sm:text-[55px] xs:text-[45px] mb-3">
                    Scan-Tap
                  </div>

                  <div className="text-[18px] sm:text-[30px]">
                    Revolutionizing the way you <br /> connect, share, and
                    engage
                    <br /> with smart NFC solutions.
                  </div>

                  <div className="w-full flex justify-center items-center">
                    <div className="text-[18px] font-semibold w-[180px] h-[50px] text-center mt-6 sm:mt-8 rounded-3xl font-sans tracking-wider pt-2.5 bg-[#16215c] text-white cursor-pointer">
                      <Link to="/shop">Order now</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Left Side (Image) */}
              <div
                className="relative flex justify-center items-center w-full lg:w-1/2 md:w-1/2 sm:w-1/2 xl:w-1/2 xxl:w-1/2 transform transition-transform duration-500 ease-out"
                style={{
                  transform: `translateY(${Math.min(
                    scrollPosition / 10,
                    20
                  )}px) scale(${1 + scrollPosition * 0.0005})`, // Zoom effect
                  zIndex: 1,
                }}
              >
                <img
                  src="https://res.cloudinary.com/dxokfhkhu/image/upload/v1743097672/0002-01_ftuayv.png"
                  alt="Digital Solutions"
                  className="w-full max-w-[1200px] mt-16 xs:mt-16 sm:mt-16 md:mt-16 lg:-mt-64 xl:-mt-64 xxl:-mt-64"
                />
              </div>

              {/* Mountain Overlay Image */}
              <img
                src="https://res.cloudinary.com/dxokfhkhu/image/upload/v1743097674/001_igz3ei.png"
                alt="Mountain Overlay"
                className="relative -mt-18 xs:-mt-18 sm:-mt-18 md:-mt-18 lg:-mt-36 xl:-mt-36 xxl:-mt-48  left-0 w-full z-[3]"
              />
            </div>
          </div>

          {/* Divider to fill the gap */}
          <div className="h-15" style={{ backgroundColor: "#16215c" }} />

          {/* Scroll Section */}
          {/* <PricingSection/> */}
          <ScrollSection />

          <PricingSection />
          {/* <Banner></Banner> */}
          <Carousal />
          {/* <CompilanceTraining> </CompilanceTraining>
      <SoftwareDevelopment></SoftwareDevelopment>
      <GraphicDesign></GraphicDesign> */}

          {/* <VideoProduction></VideoProduction>
      <Elearning></Elearning>*/}
          <CompanyLogo />
          <Seemore></Seemore>
          <StatsSection />
          <Banner></Banner>

          <Footer></Footer>
        </div>
      )}
    </div>
  );
}
