import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { fetchTodayPickDecks } from '@/lib/api';
import { DeckListResponse } from '@/types/api';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function Slider() {
  const { data, isLoading, error } = useQuery<DeckListResponse>({
    queryKey: ['today-pick-decks'],
    queryFn: fetchTodayPickDecks,
  });

  // 기본 배경 이미지 배열 (덱 개수만큼 순환)
  const defaultImages = [
    'https://brosgges.my.canva.site/champ-home/_assets/media/12509eb9a127a141cedee169e1e59aac.png',
    'https://brosgges.my.canva.site/i-home/_assets/media/75c043e0e8f28434edb4838808864434.png',
    'https://swiperjs.com/demos/images/nature-1.jpg',
    'https://swiperjs.com/demos/images/nature-2.jpg',
  ];

  const getTierColor = (tier: string) => {
    const colors: { [key: string]: string } = {
      S: '#FF6B6B',
      A: '#4ECDC4',
      B: '#95E1D3',
      C: '#F7DC6F',
      D: '#BDC3C7',
    };
    return colors[tier] || '#BDC3C7';
  };

  if (isLoading) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center text-white">
        <p>TODAY PICK을 불러오는 중...</p>
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center text-gray-400">
        <p>TODAY PICK을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  const decks = data.data;

  if (!decks || decks.length === 0) {
    return null;
  }

  return (
    <>
      <Swiper
        modules={[EffectCoverflow, Pagination, Autoplay]}
        effect={'coverflow'}
        grabCursor={true}
        slidesPerView={'auto'}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        centeredSlides={true}
        loop={decks.length > 1}
        coverflowEffect={{
          rotate: 0,
          stretch: 150,
          modifier: 1,
        }}
        pagination={{
          el: '.pagination-section',
          clickable: true,
          renderBullet: (idx, classname) => `<div class="${classname}"></div>`,
        }}
      >
        {decks.map((deck, index) => (
          <SwiperSlide key={deck.deckId}>
            <div className="deck-card">
              <img
                src={defaultImages[index % defaultImages.length]}
                alt={deck.title}
                className="deck-card-bg"
              />
              <div className="deck-card-overlay">
                <div className="deck-card-content">
                  <div
                    className="deck-tier-badge"
                    style={{ backgroundColor: getTierColor(deck.tier) }}
                  >
                    {deck.tier}
                  </div>
                  <h3 className="deck-title">{deck.title}</h3>
                  <div className="deck-stats">
                    <div className="stat-item">
                      <span className="stat-label">평균 순위</span>
                      <span className="stat-value">
                        {deck.avgPlacement?.toFixed(1) || 'N/A'}
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">픽률</span>
                      <span className="stat-value">
                        {deck.pickRate?.toFixed(1) || 'N/A'}%
                      </span>
                    </div>
                  </div>
                  <button className="view-detail-btn">자세히 보기</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
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
            height: 350px;
            opacity: 0.5;
            transition: opacity 0.3s ease;
          }

          .swiper-slide-active {
            opacity: 1;
          }

          .deck-card {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 12px;
            overflow: hidden;
            cursor: pointer;
          }

          .deck-card-bg {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .deck-card-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
              to top,
              rgba(0, 0, 0, 0.9) 0%,
              rgba(0, 0, 0, 0.4) 50%,
              rgba(0, 0, 0, 0.2) 100%
            );
            display: flex;
            align-items: flex-end;
            padding: 2rem;
          }

          .deck-card-content {
            width: 100%;
          }

          .deck-tier-badge {
            display: inline-block;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-weight: bold;
            font-size: 1.5rem;
            color: white;
            margin-bottom: 0.5rem;
          }

          .deck-title {
            font-size: 2rem;
            font-weight: bold;
            color: white;
            margin: 0.5rem 0 1rem 0;
          }

          .deck-stats {
            display: flex;
            gap: 2rem;
            margin-bottom: 1rem;
          }

          .stat-item {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          .stat-label {
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.7);
          }

          .stat-value {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--text-theme2, #06f1d2);
          }

          .view-detail-btn {
            padding: 0.75rem 1.5rem;
            background-color: var(--bg-theme2, #06f1d2);
            color: #000;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 1rem;
            cursor: pointer;
            transition: transform 0.2s ease;
          }

          .view-detail-btn:hover {
            transform: scale(1.05);
          }

          .swiper-pagination-bullet {
            background-color: #fff;
            width: 10px;
            height: 10px;
          }

          .swiper-pagination-bullet-active {
            background-color: var(--bg-theme2, #06f1d2);
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
