import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";



// import required modules
import { Pagination, Navigation } from "swiper";

const Slider = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        <SwiperSlide><div className="text-2xl bg-red-200 h-80 w-full flex items-center justify-center p-2">Slide 1</div></SwiperSlide>
        <SwiperSlide><div className="text-2xl bg-blue-200 h-80 w-full flex items-center justify-center p-2">Slide 2</div></SwiperSlide>
        <SwiperSlide><div className="text-2xl bg-purple-200 h-80 w-full flex items-center justify-center p-2">Slide 3</div></SwiperSlide>
        <SwiperSlide><div className="text-2xl bg-green-200 h-80 w-full flex items-center justify-center p-2">Slide 4</div></SwiperSlide>
      </Swiper>
    </>
  );
}

export default Slider;

