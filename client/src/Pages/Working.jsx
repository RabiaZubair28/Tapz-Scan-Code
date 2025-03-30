// import React, { useState } from "react";
// import App from "../Components/Working/App.jsx";
// import PricingSection from "../Components/Working/PricingSection.jsx";
// import Component04 from "../Components/Working/Component04.jsx";
// import FloatingCircle from "../Components/Working/FloatingCircle.jsx";
// import Carousal from "../Components/Working/Carousal.jsx";
// import Footer from "../Components/Home/Footer.jsx";
// import Seemore from "../Components/Home/Seemore.jsx";
// import StatsSection from "../Components/Working/StatsSection.jsx";
// import CompanyLogo from "../Components/Home/CompanyLogo.jsx";
// import CardsComponent01 from "../components/CardsComponents/CardsComponent01.jsx";
// import CardsComponent02 from "../components/CardsComponents/CardsComponent02.jsx";
// import CardsComponent03 from "../components/CardsComponents/CardsComponent03.jsx";
// import CardsComponent04 from "../components/CardsComponents/CardsComponent04.jsx";
// import Banner from "../Components/Home/Banner.jsx";
// import SideNav from "../components/SideNav.jsx";
// import WaveBackground from "../Components/Working/WaveBackground.jsx";

// const buttons = ["NFC Stands", "NFC Business Cards", "NFC Social Cards"];

// const RenderComponent = ({ index }) => {
//   switch (index) {
//     case 0:
//       return <CardsComponent04 />;
//     case 1:
//       return <CardsComponent01 />;
//     case 2:
//       return <CardsComponent02 />;
//     default:
//       return null;
//   }
// };

// const Working = () => {
//   const [isSelected, setIsSelected] = useState(0);

//   return (
//     <div className="bg-blue-900 min-h-screen">
//       <App />

//       <div className="flex flex-col items-center">
//         <SideNav
//           buttons={buttons}
//           isSelected={isSelected}
//           setIsSelected={setIsSelected}
//         />
//         <div className="w-full flex justify-center mt-4">
//           <RenderComponent index={isSelected} />
//         </div>
//       </div>

//       <Banner />
//       <Seemore />
//       <StatsSection />
//     </div>
//   );
// };

import { useState } from "react";
import PricingSection from "../Components/Working/PricingSection.jsx";
import Component04 from "../Components/Working/Component04.jsx";
import App from "../Components/Working/App.jsx";
import FloatingCircle from "../Components/Working/FloatingCircle.jsx";
import Carousal from "../Components/Working/Carousal.jsx";
import Footer from "../Components/Home/Footer.jsx";
import Seemore from "../Components/Home/Seemore.jsx";
import StatsSection from "../Components/Working/StatsSection.jsx";
import Banner from "../Components/Home/Banner.jsx";
import CompanyLogo from "../Components/Home/CompanyLogo.jsx";
import FloatingCard from "../Components/CardsComponents/FloatingCard.jsx";
import blackcard from "../assets/b-card.jpg";
import google from "../assets/products/google.jpg";
import insta from "../assets/products/insta.jpg";
import menu from "../assets/products/menu.jpg";
import two from "../assets/products/two.jpg";
import three from "../assets/products/three.jpg";
import four from "../assets/products/four.jpg";
import net from "../assets/products/crinkle.jpg";
import a6 from "../assets/products/a6.jpg";
import a3 from "../assets/products/a3.jpg";
import twoa3 from "../assets/products/2a3.jpg";
import a4 from "../assets/products/a4.jpg";
import twoa4 from "../assets/products/2a4.jpg";
import a5 from "../assets/products/a5.jpg";
import twoa5 from "../assets/products/2a5.jpg";
import sticker from "../assets/sticker.jpg";
import silver from "../assets/silver-metal.jpg";
import golden from "../assets/gold-metal.jpg";
import black from "../assets/black-metal.jpg";
import white from "../assets/global-stan.png";
import menustand from "../assets/menu-stand.png";
import allthree from "../assets/all-three.jpg";
import alltwo from "../assets/all-two.png";
const Working = () => {
  const [activeTab, setActiveTab] = useState("NFC Stands");

  const tabs = [
    "NFC Stands",
    "NFC Stickers",
    "NFC Social Media Cards",
    "NFC Digital Business Cards",
    "Discounted Deals",
  ];

  return (
    <div className="bg-[#16215c] h-screen">
      <App />
      <div className="flex flex-col bg-[#16215c] md:flex-row">
        {/* SideNav / Navbar */}
        <div className="w-full  bg-[#16215c] text-white px-2 py-6 md:p-4 flex md:flex-col justify-center md:justify-start xs:w-full sm:w-full md:w-2/5 lg:w-[30%] xl:w-1/5 xxl:w-1/5 md:h-screen flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-5 text-center hover:bg-[#95d1d9] rounded-md transition-all whitespace-nowrap 
            ${activeTab === tab ? "text-[#16205D] bg-[#95d1d9]" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Container */}
        <div className="w-full md:w-3/5 lg:w-[70%] xl:w-4/5 xxl:w-4/5 px-4">
          {activeTab === "NFC Stands" && (
            <div className="px-0 bg-[#16215c] text-white grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-3 gap-2 mt-0 xs:mt-0 sm:mt-0 md:mt-8 lg:mt-8 xl:mt-8 xxl:mt-8">
              <FloatingCard
                title="Net-Style NFC Stand"
                image={net}
                name="Net-Style NFC Stand"
              />
              <FloatingCard
                title="NFC Menu Stand"
                image={menustand}
                name="NFC Menu Stand"
              />
              <FloatingCard
                title="A-3.5 Size NFC Stand"
                image={a3}
                name="A-3.5 Size NFC Stand"
              />
              <FloatingCard
                title="A-4 Size NFC Stand"
                image={a4}
                name="A-4 Size NFC Stand"
              />
              <FloatingCard
                title="A-5 Size NFC Stand"
                image={a5}
                name="A-5 Size NFC Stand"
              />
              <FloatingCard
                title="A-6 Size NFC Stand"
                image={a6}
                name="A-6 Size NFC Stand"
              />
            </div>
          )}
          {activeTab === "NFC Stickers" && (
            <div className="px-0 bg-[#16215c] text-white grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-3 gap-2 mt-0 xs:mt-0 sm:mt-0 md:mt-8 lg:mt-8 xl:mt-8 xxl:mt-8">
              <FloatingCard
                title="NFC Sticker"
                image={sticker}
                name="NFC Sticker"
              />
            </div>
          )}
          {activeTab === "NFC Social Media Cards" && (
            <div className="px-0 bg-[#16215c] text-white grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-3 gap-2 mt-0 xs:mt-0 sm:mt-0 md:mt-8 lg:mt-8 xl:mt-8 xxl:mt-8">
              <FloatingCard
                title="NFC Google Review Card"
                image={google}
                name="NFC Google Review Card"
              />
              <FloatingCard
                title="NFC Instagram Card"
                image={insta}
                name="NFC Instagram Card"
              />
              <FloatingCard
                title="NFC Facebook Card"
                image="https://via.placeholder.com/300"
                name="NFC Facebook Card"
              />
              <FloatingCard
                title="NFC WhatsApp Card"
                image="https://via.placeholder.com/300"
                name="NFC WhatsApp Card"
              />
              <FloatingCard
                title="NFC Snapchat Card"
                image="https://via.placeholder.com/300"
                name="NFC Snapchat Card"
              />
              <FloatingCard
                title="NFC Tiktok Card"
                image="https://via.placeholder.com/300"
                name="NFC Tiktok Card"
              />
              <FloatingCard
                title="NFC Menu Card"
                image={menu}
                name="NFC Menu Card"
              />
            </div>
          )}
          {activeTab === "NFC Digital Business Cards" && (
            <div className="px-0 bg-[#16215c] text-white grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-3 gap-2 mt-0 xs:mt-0 sm:mt-0 md:mt-8 lg:mt-8 xl:mt-8 xxl:mt-8">
              <FloatingCard
                title="Black Metal Digital Business Card"
                image={black}
                name="Black Metal Digital Business Card"
              />
              <FloatingCard
                title="Gold Metal Digital Business Card"
                image={golden}
                name="Gold Metal Digital Business Card"
              />
              <FloatingCard
                title="Silver Metal Digital Business Card"
                image={silver}
                name="Silver Metal Digital Business Card"
              />
              <FloatingCard
                title="Gold Metal Digital Business Card"
                image="https://via.placeholder.com/300"
                name="Gold Metal Digital Business Card"
              />
              <FloatingCard
                title="Black PVC Digital Business Card"
                image={blackcard}
                name="Black PVC Digital Business Card"
              />
              <FloatingCard
                title="White PVC Digital Business Card"
                image={white}
                name="White PVC Digital Business Card"
              />
            </div>
          )}
          {activeTab === "Discounted Deals" && (
            <div className="px-0 bg-[#16215c] text-white grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-3 gap-2 mt-0 xs:mt-0 sm:mt-0 md:mt-8 lg:mt-8 xl:mt-8 xxl:mt-8">
              <FloatingCard
                title="Two A-3.5 Size NFC Stands"
                image={twoa3}
                name="Two A-3.5 Size NFC Stands"
              />

              <FloatingCard
                title="Two A-4 Size NFC Stands"
                image={twoa4}
                name="Two A-4 Size NFC Stands"
              />
              <FloatingCard
                title="Two A-5 Size NFC Stands"
                image={twoa5}
                name="Two A-5 Size NFC Stands"
              />
              <FloatingCard
                title="All Three NFC Business Cards Deal"
                image={allthree}
                name="All Three NFC Business Cards Deal"
              />
              <FloatingCard
                title="All Two NFC Business Cards Deal"
                image={alltwo}
                name="All Two NFC Business Cards Deal"
              />
              <FloatingCard
                title="Any Two NFC Cards Deal"
                image={two}
                name="Any Two NFC Cards Deal"
              />

              <FloatingCard
                title="Any Three NFC Cards Deal"
                image={three}
                name="Any Three NFC Cards Deal"
              />
              <FloatingCard
                title="Any Four NFC Cards Deal"
                image={four}
                name="Any Four NFC Cards Deal"
              />
            </div>
          )}
        </div>
      </div>
      <Banner />
      <Seemore />
      <StatsSection />
      <Footer />
    </div>
  );
};

export default Working;
