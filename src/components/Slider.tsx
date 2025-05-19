import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './Slider.css';

export default function Slider() {
  return (
    <Swiper
      modules={[EffectCoverflow, Pagination, Autoplay]}
      effect={'coverflow'}
      grabCursor={true}
      slidesPerView={'auto'}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      centeredSlides={true}
      loop={true}
      coverflowEffect={{
        rotate: 0,
        stretch: 150,
        // depth: 100,
        modifier: 1,
      }}
      pagination={{
        el: '.pagination-section',
        clickable: true,
        renderBullet: (idx, classname) => `<div class="${classname}"></div>`,
      }}
    >
      <SwiperSlide>
        <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="first" />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://swiperjs.com/demos/images/nature-2.jpg"
          alt="second"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://swiperjs.com/demos/images/nature-3.jpg" alt="third" />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://swiperjs.com/demos/images/nature-4.jpg"
          alt="fourth"
        />
      </SwiperSlide>
      <div className="pagination-section"></div>
    </Swiper>
  );
}
