import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import bcard from "../../assets/b-card.jpg";
import scard from "../../assets/o-one.jpg";
import stand from "../../assets/stand.jpg";
import sticker from "../../assets/sticker.jpg";
import metalcard from "../../assets/silver-metal.jpg";
// Pricing data
const plans = [
  {
    name: "PVC NFC  Business Card",
    link: bcard,
    features: [
      "Customizable profile with social details.",
      "Integrated Map, QR & Image Gallery.",
      "Instantly save and share contact.",
    ],
  },

  {
    name: "NFC Social-Media Stand",
    link: stand,
    features: [
      "Showcase menus, catalogue, or links with ease.",
      "Durable and stylish designs for any setting.",
      "Contactless interaction for customer engagement.",
    ],
  },
  {
    name: "Metal NFC Business Card",
    link: metalcard,
    features: [
      "Showcase menus, catalogue, or links with ease.",
      "Durable and stylish designs for any setting.",
      "Contactless interaction for customer engagement.",
    ],
  },
  {
    name: "NFC Menu Stand",
    link: stand,
    features: [
      "Showcase menus, catalogue, or links with ease.",
      "Durable and stylish designs for any setting.",
      "Contactless interaction for customer engagement.",
    ],
  },
  {
    name: "NFC Sticker",
    link: sticker,
    features: [
      "Showcase menus, catalogue, or links with ease.",
      "Durable and stylish designs for any setting.",
      "Contactless interaction for customer engagement.",
    ],
  },
  {
    name: "NFC Social Media Card",
    link: scard,
    features: [
      "Instantly share social medias with a single tap.",
      "Customizable designs to match your brand.",
      "No app required—works seamlessly on all devices.",
    ],
  },

  {
    name: "NFC Menu Sticker",
    link: stand,
    features: [
      "Showcase menus, catalogue, or links with ease.",
      "Durable and stylish designs for any setting.",
      "Contactless interaction for customer engagement.",
    ],
  },
];

function PricingSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className=" bg-[#16215c] pt-2 pb-10 xs:pb-20 sm:pb-20 md:pb-20 lg:pb-20 xl:pb-20 xxl:pb-20   px-2">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[25px] xs:text-[25px] sm:text-[25px] md:text-[25px] lg:text-[45px] xl:text-[45px] xxl:text-[45px] font-semibold text-center text-blue-50  mt-8 mb-4 xs:mb-4 sm:mb-4 md:mb-4 lg:mb-8 xl:mb-8 xxl:mb-8 xs:mt-8 sm:mt-8 md:mt-8 lg:mt-16 xl:mt-16 xxl:mt-16"
        >
          Featured Products
        </motion.h1>

        {/* Plans */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 xs:gap-1.5 sm:gap-1.5 md:gap-1.5 lg:gap-5 xl:gap-5 xxl:gap-5">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className={`relative rounded-md space-y-1 xs:space-y-1 sm:space-y-1 md:space-y-1 lg:space-y-2 xl:space-y-2 xxl:space-y-2 xs:rounded-3xl sm:rounded-3xl md:rounded-3xl lg:rounded-3xl xl:rounded-3xl xxl:rounded-3xl px-0.5 py-0.5 xs:px-0.5  xs:py-0.5 sm:px-0.5  sm:py-0.5 md:px-0.5  md:py-0.5 lg:px-2  lg:py-2 xl:px-2  xl:py-2 xxl:px-2  xxl:py-2 cursor-pointer transition-transform duration-200 ease-out transform
                ${
                  hoveredCard === index
                    ? "bg-white text-black shadow-2xl scale-105"
                    : "bg-blue-50 border border-gray-200 hover:shadow-lg"
                }`}
            >
              <img
                src={plan.link}
                className="rounded-md xs:rounded-md sm:rounded-md md:rounded-md lg:rounded-xl xl:rounded-xl xx:rounded-xl w-full"
              ></img>
              {/* <div className="text-[12px] xs:text-[45px] sm:text-[45px] md:text-[45px] lg:text-[45px] xl:text-[45px] xxl:text-[45px] text-center font-bold mt-2 mb-0 xs:mb-2 xs:mt-5 sm:mb-2 sm:mt-5 md:mb-2 md:mt-5 lg:mb-2 lg:mt-5 xl:mb-2 xl:mt-5 xxl:mb-2 xxl:mt-5">
                {plan.name}
              </div> */}

              {/* <ul className="space-y-0.5 xs:space-y-4 sm:space-y-4 md:space-y-4 lg:space-y-4 xl:space-y-4 xxl:space-y-4 mt-1.5 mb-1.5 xs:mb-5 xs:mt-5 sm:mb-5 sm:mt-5 md:mb-5 md:mt-5 lg:mb-5 lg:mt-5 xl:mb-5 xl:mt-5 xxl:mb-5 xxl:mt-5">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check
                      className={`w-5 h-5 ${
                        hoveredCard === index
                          ? "text-[#A5E1E9]"
                          : "text-[#F4A340]"
                      }`}
                    />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul> */}
              <button
                className={`w-full py-1 xs:py-3 sm:py-3 md:py-3 lg:py-3 xl:py-3 xxl:py-3 rounded-md xs:rounded-xl sm:rounded-xl md:rounded-xl lg:rounded-xl xl:rounded-xl xxl:rounded-xl font-medium transition-all duration-200 ease-out cursor-pointer text-[12px] xs:text-[12px] sm:text-[12px] md:text-[12px] lg:text-[18px] xl:text-[18px] xxl:text-[18px]
                  ${
                    hoveredCard === index
                      ? "bg-[#F4A340] text-white hover:bg-[#f4a340ee] shadow-md"
                      : "bg-[#A5E1E9] text-[#16205D] hover:bg-[#95d1d9]"
                  }`}
              >
                {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PricingSection;
