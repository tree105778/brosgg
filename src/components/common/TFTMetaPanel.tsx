import { TFTMetaPanelProp } from '@/types/prop';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import ChampionHexagonContainer from '@/components/common/ChampionHexagonContainer';

export default function TFTMetaPanel({
  metaPanel,
}: {
  metaPanel: TFTMetaPanelProp;
}) {
  const router = useRouter();
  const {
    metaName,
    metaTier,
    champs,
    avgPlacement,
    firstRate,
    pickRate,
    top4Rate,
    deckId,
  } = metaPanel;

  const handlePanelClick = () => {
    if (deckId) {
      router.push(`/deck/${deckId}`);
    }
  };

  return (
    <div
      onClick={handlePanelClick}
      css={css`
        display: flex;
        gap: 1rem;
        background-color: #111111;
        width: 110%;
        margin: 1rem;
        align-items: center;
        border-radius: 0.5rem;
        cursor: ${deckId ? 'pointer' : 'default'};

        @media (max-width: 1024px) {
          width: 100%;
          gap: 0.75rem;
          margin: 0.75rem 0;
          flex-wrap: wrap;
          padding: 0.75rem;
        }

        @media (max-width: 640px) {
          gap: 0.5rem;
          margin: 0.5rem 0;
          padding: 0.5rem;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          color: var(--text-theme2);
          width: 4rem;
          height: 145px;
          background-color: var(--bg-theme3);
          font-size: 1.5rem;
          border-radius: 0.5rem;

          @media (max-width: 1024px) {
            width: 3rem;
            height: 100px;
            font-size: 1.25rem;
          }

          @media (max-width: 640px) {
            width: 2.5rem;
            height: 60px;
            font-size: 1rem;
          }
        `}
      >
        {metaTier}
      </div>
      <p className="md:!text-2xl sm:!text-lg !text-white font-bold h-fit md:!mx-4 sm:!mx-2">
        {metaName}
      </p>
      <div className="flex flex-1 h-fit md:gap-1 sm:gap-0.5 flex-wrap">
        {champs.map((champ, idx) => (
          <ChampionHexagonContainer key={idx} champion={champ} />
        ))}
      </div>
      <div className="flex flex-col gap-1 items-center md:text-base sm:text-sm">
        <p>평균 순위</p>
        <p className="!text-white font-bold">{avgPlacement}</p>
      </div>
      <div className="flex flex-col gap-1 items-center md:text-base sm:text-sm">
        <p>순방 확률</p>
        <p className="!text-white font-bold">{top4Rate}%</p>
      </div>
      <div className="flex flex-col gap-1 items-center md:text-base sm:text-sm">
        <p>1등 확률</p>
        <p className="!text-white font-bold">{firstRate}%</p>
      </div>
      <div className="flex flex-col gap-1 items-center md:!mr-8 sm:!mr-2 md:text-base sm:text-sm">
        <p>픽률</p>
        <p className="!text-white font-bold">{pickRate}%</p>
      </div>
    </div>
  );
}
