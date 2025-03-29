import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Gallery.css";

// Import images
import card01 from "../../assets/card01.jpg";
import card02 from "../../assets/card02.jpg";
import card03 from "../../assets/card03.jpg";
import card04 from "../../assets/card04.jpg";
import stand01 from "../../assets/stand01.jpg";
import stand02 from "../../assets/stand02.jpg";



const Gallery = () => {
  const images = [
    card01, card02, card03, card04, stand01, stand02, card01
  ];

  return (
    <div className="gallery-container">
      <h2 className="text-center text-4xl font-bold text-white mb-6">Our Products</h2>
      <div className="relative w-full">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper-container"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="rounded-lg shadow-lg border-4 border-white"
              />
            </SwiperSlide>
          ))}
          <div className="slider-controller">
            <div className="swiper-button-prev slider-arrow">
              <span>&#x276E;</span>
            </div>
            <div className="swiper-button-next slider-arrow">
              <span>&#x276F;</span>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Gallery;
