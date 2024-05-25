import * as React from "react";
import { useSwiper } from 'swiper/react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import bg_1 from "../../assets/home_bg_1.jpg";
import bg_2 from "../../assets/home_bg_2.jpg";
import bg_3 from "../../assets/home_bg_3.jpg";
import bg_4 from "../../assets/home_bg_4.jpg";
import bg_5 from "../../assets/home_bg_5.jpg";
import bg_6 from "../../assets/home_bg_6.jpg";


function Carousel() {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={window.innerWidth > 600 ? 50 : 10}
        slidesPerView={1.5}
        className="cursor-pointer"
      >
        <SwiperSlide><img className="h-48 md:h-96 w-full object-cover" src={bg_1} alt="" /></SwiperSlide>
        <SwiperSlide><img className="h-48 md:h-96 w-full object-cover" src={bg_2} alt="" /></SwiperSlide>
        <SwiperSlide><img className="h-48 md:h-96 w-full object-cover" src={bg_3} alt="" /></SwiperSlide>
        <SwiperSlide><img className="h-48 md:h-96 w-full object-cover" src={bg_4} alt="" /></SwiperSlide>
        <SwiperSlide><img className="h-48 md:h-96 w-full object-cover" src={bg_5} alt="" /></SwiperSlide>
        <SwiperSlide><img className="h-48 md:h-96 w-full object-cover" src={bg_6} alt="" /></SwiperSlide>
      </Swiper>

      <div className="swiper-button-next absolute right-0 top-1/2 z-50 h-8 w-8 rounded-full cursor-pointer text-lg text-center bg-blue-400 right-to-left"><i className="fa-solid fa-angle-right"></i></div>
      <div className="swiper-button-prev absolute left-0 top-1/2 z-50 h-8 w-8 rounded-full cursor-pointer text-lg text-center bg-blue-400 left-to-right"><i className="fa-solid fa-angle-left"></i></div>
    </div>
  );
}

export default function GuestHome() {
  return (
    <div className="">
      <div id="rain-bow"></div>
      <Carousel />
    </div>
  );
}

