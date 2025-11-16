import { useMemo, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { fetchMetaDecks, fetchDeckDetail } from '@/lib/api';
import { DeckDetail } from '@/types/api';
import { LevelSelector } from '@/components/deck/LevelSelector';
import { DeckBoardSection } from '@/components/deck/DeckBoardSection';
import { DeckItemRecommendations } from '@/components/deck/DeckItemRecommendations';
import HeaderInfoSection from '@/components/common/HeaderInfoSection';
import { css } from '@emotion/react';
import { parseSynergies } from '@/lib/deckUtils';
import SynergyInfo from '@/components/builder/SynergyInfo';

interface DeckDetailPageProps {
  deckDetail: DeckDetail;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const decks = await fetchMetaDecks({ activate: true });

  const paths = decks.data.map((deck) => ({
    params: { id: deck.deckId.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<DeckDetailPageProps> = async ({
  params,
}) => {
  const deckId = params?.id as string;

  try {
    // 1. 덱 상세 정보 가져오기
    const deckDetailResponse = await fetchDeckDetail(deckId);

    if (!deckDetailResponse.success || !deckDetailResponse.data) {
      return { notFound: true };
    }

    return {
      props: {
        deckDetail: deckDetailResponse.data,
      },
      revalidate: 3600, // 1시간마다 재생성
    };
  } catch (error) {
    console.error('Failed to fetch deck detail:', error);
    return { notFound: true };
  }
};

export default function DeckDetailPage({ deckDetail }: DeckDetailPageProps) {
  const [selectedLevel, setSelectedLevel] = useState(8); // 기본 레벨 8

  const currentBoard = deckDetail.boards.find(
    (board) => board.level === selectedLevel,
  );

  const parsedSynergies = useMemo(
    () => parseSynergies(currentBoard?.synergies || null),
    [currentBoard?.synergies],
  );

  const handleCopyTipCode = async () => {
    const tipCode = `https://brosgg.com/deck/${deckDetail.deckId}`;
    await navigator.clipboard.writeText(tipCode);
    alert('덱 링크가 복사되었습니다!');
  };

  return (
    <>
      {/* 헤더 */}
      <HeaderInfoSection
        title={deckDetail.title}
        description={deckDetail.description}
      />

      {/* 메인 섹션 */}
      <section
        css={css`
          width: 50%;
          margin: 4.5rem auto 2rem;
          color: var(--text-theme1);

          @media (max-width: 1440px) {
            width: 65%;
          }

          @media (max-width: 1024px) {
            width: 85%;
            margin: 3rem auto 2rem;
          }

          @media (max-width: 640px) {
            width: 95%;
            margin: 2rem auto 1rem;
          }
        `}
      >
        {/* 팁코드 복사 버튼 */}
        <div className="w-full">
          <button
            onClick={handleCopyTipCode}
            css={css`
              margin-bottom: 1rem;
              padding: 1rem 1.75rem;
              background-color: var(--bg-theme3);
              border-radius: 4px;
              transition: background-color 0.2s;

              &:hover {
                background-color: #03d1b5;
              }
            `}
          >
            팀코드 복사
          </button>
        </div>
        {/* 시너지 섹션 */}
        <div
          css={css`
            display: flex;
            gap: 0.25rem;
            flex-wrap: nowrap;
            overflow-x: auto;
            width: 100%;
            margin: 0 auto -2rem;
            align-items: center;
          `}
        >
          {parsedSynergies.map((synergy) => (
            <SynergyInfo key={synergy.trait} trait={synergy} />
          ))}
        </div>
        {/* <DeckSynergySection synergies={currentBoard?.synergies || null} /> */}

        {/* 증강 정보 -> 현재 구현 X */}

        {/* 레벨 선택기 */}
        <LevelSelector
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
          availableLevels={deckDetail.boards.map((b) => b.level)}
        />

        {/* 보드 섹션 */}
        <DeckBoardSection board={currentBoard} />

        {/* 아이템 추천 섹션 */}
        {currentBoard && currentBoard.units.length > 0 && (
          <DeckItemRecommendations units={currentBoard.units} />
        )}
      </section>
    </>
  );
}
