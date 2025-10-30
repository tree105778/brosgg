import { css } from '@emotion/react';
import Image from 'next/image';
import { ChampionHexagonContainerProp } from '@/types/prop';

const costColor: { [key: number]: string } = {
  1: '#595959',
  2: '#03937F',
  3: '#1287CF',
  4: '#9A30AE',
  5: '#FFB700',
};

export default function ChampionHexagonContainer({
  champion: { cost, image, name, items },
}: {
  champion: ChampionHexagonContainerProp;
}) {
  return (
    <div>
      <div
        css={css`
          clip-path: polygon(
            50% 0%,
            100% 25%,
            100% 75%,
            50% 100%,
            0% 75%,
            0% 25%
          );
          width: 60px;
          height: 60px;
          background-color: ${costColor[cost]};
        `}
      >
        <div
          css={css`
            width: 90%;
            height: 90%;
            clip-path: inherit;
            position: relative;
            overflow: hidden;
            top: 5%;
            left: 5%;
          `}
        >
          <Image
            src={image}
            alt={name}
            width={60}
            height={60}
            objectFit="cover"
          />
        </div>
      </div>
      <div className="flex">
        {items.map((item, idx) => (
          <Image
            key={idx}
            src={item.itemImgSrc}
            alt={item.itemName}
            width={20}
            height={20}
          />
        ))}
      </div>
    </div>
  );
}
