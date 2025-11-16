import Image from 'next/image';
import { css } from '@emotion/react';
import type { DeckUnit } from '@/types/api';
interface DeckItemRecommendationsProps {
  units: DeckUnit[];
}

export function DeckItemRecommendations({
  units,
}: DeckItemRecommendationsProps) {
  // 아이템이 있는 유닛만 필터링
  const unitsWithItems = units.filter(
    (unit) => unit.itemDetails && unit.itemDetails.length > 0,
  );

  if (unitsWithItems.length === 0) {
    return null;
  }

  return (
    <section
      css={css`
        background-color: #2a2a2a;
        border-radius: 8px;
        padding: 1.5rem;
      `}
    >
      <h2
        css={css`
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          margin-bottom: 1rem;
        `}
      >
        아이템 추천
      </h2>

      <div>
        {unitsWithItems.map((unit) => {
          const championName =
            unit.championName ?? unit.name ?? unit.championId;

          return (
            <div
              key={unit.unitId}
              css={css`
                display: flex;
                align-items: center;
                gap: 1rem;
                background-color: #1a1a1a;
                border-radius: 4px;
                padding: 1rem;
                margin-bottom: 1rem;

                &:last-child {
                  margin-bottom: 0;
                }
              `}
            >
              {/* 좌측: 챔피언 */}
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  gap: 0.75rem;
                  width: 12rem;
                `}
              >
                <div className="relative w-12 h-12">
                  <Image
                    src={unit.imageUrl}
                    alt={championName}
                    width={48}
                    height={48}
                    className="rounded"
                  />
                </div>
                <span
                  css={css`
                    color: white;
                    font-weight: 600;
                  `}
                >
                  {championName}
                </span>
              </div>

              {/* 우측: 아이템 목록 */}
              <div className="flex gap-2 flex-wrap">
                {unit.itemDetails.map((item, index) => (
                  <div
                    key={`${item.apiName}-${index}`}
                    css={css`
                      position: relative;
                      display: inline-block;

                      &:hover > div {
                        display: block;
                      }
                    `}
                  >
                    <Image
                      src={item.iconUrl}
                      alt={item.name}
                      width={40}
                      height={40}
                      css={css`
                        border-radius: 4px;
                        border: 2px solid #4b5563;
                        transition: border-color 0.2s;

                        &:hover {
                          border-color: #04f2d2;
                        }
                      `}
                    />
                    <div
                      css={css`
                        display: none;
                        position: absolute;
                        background-color: #000;
                        color: white;
                        font-size: 0.75rem;
                        padding: 0.5rem;
                        border-radius: 4px;
                        top: -2.5rem;
                        left: 0;
                        white-space: nowrap;
                        z-index: 10;
                      `}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
