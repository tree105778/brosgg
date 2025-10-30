import { RecommendItemContainerProp } from '@/types/prop';
import { css } from '@emotion/react';
import Image from 'next/image';

export default function RecommendItemContainer({
  recommendItems: { avgPlacement, firstRate, gameCount, items, top4Rate },
}: {
  recommendItems: RecommendItemContainerProp;
}) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        background-color: #282828;
        padding: 0.5rem;
        justify-content: space-between;
        color: var(--text-theme1);
        margin: 0.5rem;
      `}
    >
      <div className="flex gap-1">
        {items.map((item, idx) => (
          <Image
            key={idx}
            src={item.itemImgSrc}
            alt={item.itemName}
            width={30}
            height={30}
          />
        ))}
      </div>
      <div className="flex gap-8 !mr-5">
        <div className="flex flex-col items-center">
          <p>평균 순위</p>
          <p className="!text-xl text-white">{avgPlacement}%</p>
        </div>
        <div className="flex flex-col items-center">
          <p>순방 확률</p>
          <p className="!text-xl text-white">{top4Rate}%</p>
        </div>
        <div className="flex flex-col items-center">
          <p>1등 확률</p>
          <p className="!text-xl text-white">{firstRate}%</p>
        </div>
        <div className="flex flex-col items-center">
          <p>게임 수</p>
          <p className="!text-xl text-white">{gameCount}</p>
        </div>
      </div>
    </div>
  );
}
