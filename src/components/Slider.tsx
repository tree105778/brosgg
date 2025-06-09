import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function Slider() {
  return (
    <>
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
          <img
            src="https://swiperjs.com/demos/images/nature-1.jpg"
            alt="first"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-2.jpg"
            alt="second"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-3.jpg"
            alt="third"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-4.jpg"
            alt="fourth"
          />
        </SwiperSlide>
        <div className="pagination-section"></div>
      </Swiper>
      <style jsx global>
        {`
          .swiper {
            width: 100%;
            margin-top: 1rem;
          }

          .swiper-slide {
            background-size: cover;
            background-position: center;
            width: 50%;
            height: 300px;
            opacity: 0.5;
          }

          .swiper-slide-active {
            opacity: 1;
          }

          .swiper-slide img {
            display: block;
            width: 100%;
            height: 100%;
          }

          .swiper-pagination-bullet {
            background-color: #fff;
            width: 10px;
            height: 10px;
          }

          .swiper-pagination-bullet-active {
            background-color: var(--bg-theme2);
            width: 1.5rem;
            border-radius: 2px;
          }

          .pagination-section {
            display: flex;
            justify-content: center;
            margin-top: 2rem;
          }
        `}
      </style>
    </>
  );
}
