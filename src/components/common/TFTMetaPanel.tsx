import { TFTMetaPanelProp } from '@/types/prop';
import { css } from '@emotion/react';
import ChampionHexagonContainer from '@/components/common/ChampionHexagonContainer';

export default function TFTMetaPanel({
  metaPanel,
}: {
  metaPanel: TFTMetaPanelProp;
}) {
  const {
    metaName,
    metaTier,
    champs,
    avgPlacement,
    firstRate,
    pickRate,
    top4Rate,
  } = metaPanel;

  return (
    <div
      css={css`
        display: flex;
        gap: 1rem;
        background-color: #111111;
        width: 110%;
        margin: 1rem;
        align-items: center;
        border-radius: 0.5rem;
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
        `}
      >
        {metaTier}
      </div>
      <p className="!text-2xl !text-white font-bold h-fit !mx-4 font-bold">
        {metaName}
      </p>
      <div className="flex flex-1 h-fit gap-1">
        {champs.map((champ, idx) => (
          <ChampionHexagonContainer key={idx} champion={champ} />
        ))}
      </div>
      <div className="flex flex-col gap-1 items-center">
        <p>평균 순위</p>
        <p className="!text-white font-bold">{avgPlacement}</p>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <p>순방 확률</p>
        <p className="!text-white font-bold">{top4Rate}%</p>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <p>1등 확률</p>
        <p className="!text-white font-bold">{firstRate}%</p>
      </div>
      <div className="flex flex-col gap-1 items-center !mr-8">
        <p>픽률</p>
        <p className="!text-white font-bold">{pickRate}%</p>
      </div>
    </div>
  );
}
