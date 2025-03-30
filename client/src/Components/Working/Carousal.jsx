import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import scard01 from "../../assets/o-one.jpg";
import scard02 from "../../assets/logos/s-card-2.jpg";
import scard03 from "../../assets/global-stan.jpg";
import scard04 from "../../assets/logos/s-card-4.jpg";
import scard05 from "../../assets/m-design.jpg";
import scard06 from "../../assets/three-cards.jpg";
import stand01 from "../../assets/logos/stand-1.jpg";
import stand02 from "../../assets/logos/stand-2.jpg";
import stand03 from "../../assets/logos/stand-3.jpg";
import stand04 from "../../assets/new-stand.jpg";
import stand05 from "../../assets/logos/stand-5.jpg";
import stand06 from "../../assets/logos/stand-6.jpg";
import bcard01 from "../../assets/logos/b-card-1.jpg";
import bcard02 from "../../assets/logos/b-card-2.png";
import bcard03 from "../../assets/silver-metal.jpg";
import bcard04 from "../../assets/gold-metal.jpg";
import bcard05 from "../../assets/black-metal.jpg";
import bcard06 from "../../assets/logos/b-card-6.png";
import { useNavigate } from "react-router-dom";
const slides = [
  {
    title: "DIGITAL BUSINESS CARDS TO",
    highlight: "SHOWCASE",
    subtitle: "YOUR PROFILE",
    image: [bcard01, bcard03, bcard04, bcard02, bcard05, bcard06],
    link: [
      "https://res.cloudinary.com/dxokfhkhu/image/upload/v1743307950/b-card-1_nlgzul.jpg",
      "https://res.cloudinary.com/dxokfhkhu/image/upload/v1743306995/silver-metal_rj4gj3.jpg",
      "https://res.cloudinary.com/dxokfhkhu/image/upload/v1743306456/gold-metal_pu2co9.jpg",
      "https://res.cloudinary.com/dxokfhkhu/image/upload/v1743308088/b-card-2_x2c5ss.png",
      "https://res.cloudinary.com/dxokfhkhu/image/upload/v1743306444/black-metal_lvgdix.jpg",
      "https://res.cloudinary.com/dxokfhkhu/image/upload/v1743308093/b-card-6_tfjo5a.png",
    ],
  },
  {
    title: "NFC STANDS TO",
    highlight: "ELEVATE",
    subtitle: "YOUR BUSINESS",
    image: [stand01, stand02, stand03, stand04, stand05, stand06],
    link: [
      "https://res.cloudinary.com/dxokfhkhu/image/upload/v1743306391/stand-1_qpo6x1.jpg",
      "https://res.cloudinary.com/dxokfhkhu/image/upload/v1743306390/stand-2_glprse.jpg",
      "https://res.cloudinary.com/dxokfhkhu/image/upload/v1743306388/stand-3_bnvdb7.jpg",
      "https://res.cloudinary.com/dxokfhkhu/image/upload/v1743306461/new-stand_rtizmi.jpg",
      "https://res.cloudinary.com/dxokfhkhu/image/upload/v1743306385/stand-5_dddzzq.jpg",
      "https://res.cloudinary.com/dxokfhkhu/image/upload/v1743306382/stand-6_cggiiv.jpg",
    ],
  },
  {
    title: "NFC SOCIAL-MEDIA CARDS TO",
    highlight: "CONNECT",
    subtitle: "IN ONE TAP",
    image: [scard02, scard01, scard03, scard04, scard05, scard06],
    link: [
      "https://res.cloudinary.com/dxokfhkhu/image/upload/v1743306398/s-card-2_zkgl8h.jpg",
      "https://res.cloudinary.com/dxokfhkhu/image/upload/v1743306993/o-one_irphgk.jpg",
      "https://res.cloudinary.com/dxokfhkhu/image/upload/v1743306453/global-stan_fc8iap.jpg",
      "https://res.cloudinary.com/dxokfhkhu/image/upload/v1743306401/s-card-4_stzruc.jpg",
      "https://res.cloudinary.com/dxokfhkhu/image/upload/v1743306985/m-design_gx2uxg.jpg",
      "https://res.cloudinary.com/dxokfhkhu/image/upload/v1743306999/three-cards_upoe4f.jpg",
    ],
  },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

function Carousal() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [autoPlay, setAutoPlay] = useState(true);

  const slideIndex = ((page % slides.length) + slides.length) % slides.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => {
        paginate(1);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [page, autoPlay]);

  return (
    <div className="relative h-[480px] bg-[#f7f9fa] overflow-hidden">
      <div className="relative h-[480px] flex items-center justify-center px-4 -mt-2">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full "
            onHoverStart={() => setAutoPlay(false)}
            onHoverEnd={() => setAutoPlay(true)}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-2 mb-10"
              >
                <h2 className="text-xl md:text-3xl text-[#16205D] font-light">
                  {slides[slideIndex] ? (
                    <>
                      {slides[slideIndex].title}{" "}
                      <span className="font-bold">
                        {slides[slideIndex].highlight}
                      </span>{" "}
                      {slides[slideIndex].subtitle}
                    </>
                  ) : (
                    "Loading..."
                  )}
                </h2>
              </motion.div>
              <div className="grid grid-cols-3 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 xxl:grid-cols-6 gap-1 xs:gap-1 sm:gap-1 md:gap-1 lg:gap-3 xl:gap-3 xxl:gap-3 px-3 md:px-24 -mt-2">
                {slides[slideIndex]?.image.map((img, idx) => (
                  <motion.img
                    key={idx}
                    src={img}
                    alt={`Slide Image ${idx}`}
                    className="w-full h-[150px] md:h-[250px] rounded-md object-cover"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.2 }}
                    onClick={() => {
                      window.open(slides[slideIndex].link[idx], "_blank");
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 ">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${
              slideIndex === idx ? "bg-gray-800" : "bg-gray-400"
            }`}
            onClick={() => setPage([idx, idx > slideIndex ? 1 : -1])}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousal;
