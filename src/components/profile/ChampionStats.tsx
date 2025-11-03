import { css } from '@emotion/react';
import { EntityUsageWithPlacement } from '@/types/api';
import ChampionHexagonContainer from '../common/ChampionHexagonContainer';

interface ChampionStatsProps {
  championStats: EntityUsageWithPlacement[];
}

const getPlacementColor = (placement: number) => {
  if (placement <= 2.5) return '#22c55e'; // 녹색
  if (placement <= 4) return '#f59e0b'; // 주황색
  return '#ef4444'; // 빨간색
};

export default function ChampionStats({ championStats }: ChampionStatsProps) {
  const getChampionImage = (apiName: string) => {
    // Extract champion name from apiName (e.g., TFT14_Ahri -> Ahri)
    const championName = apiName.split('_').pop() || apiName;
    return `https://d18kctlbb86miz.cloudfront.net/champions/${championName}.png`;
  };

  return (
    <div
      css={css`
        background-color: var(--bg-theme3);
        border-radius: 8px;
        padding: 1.5rem;
        width: 100%;
      `}
    >
      <h2
        css={css`
          font-size: 1.25rem;
          font-weight: bold;
          color: var(--text-theme2);
          margin-bottom: 1rem;
        `}
      >
        챔피언 통계{' '}
        <span
          css={css`
            color: var(--text-theme1);
            font-size: 0.75rem;
            margin-left: 0.125rem;
          `}
        >
          최근 20게임
        </span>
      </h2>
      <div
        css={css`
          display: grid;
          grid-template-columns: 3fr 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        `}
      >
        <div
          css={css`
            color: #999999;
            font-size: 0.875rem;
          `}
        >
          챔피언
        </div>
        <div
          css={css`
            color: #999999;
            font-size: 0.875rem;
            text-align: center;
          `}
        >
          게임
        </div>
        <div
          css={css`
            color: #999999;
            font-size: 0.875rem;
            text-align: center;
            text-wrap: nowrap;
          `}
        >
          평균 등수
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        `}
      >
        {championStats.slice(0, 4).map((stat, idx) => (
          <div
            key={idx}
            css={css`
              display: grid;
              grid-template-columns: 3fr 1fr 1fr;
              align-items: center;
              gap: 1rem;
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                gap: 0.75rem;
              `}
            >
              <ChampionHexagonContainer
                champion={{
                  name: stat.displayName,
                  cost: 1,
                  image: getChampionImage(stat.apiName),
                  items: [],
                }}
              />
              <span
                css={css`
                  color: white;
                  font-weight: 600;
                `}
              >
                {stat.displayName}
              </span>
            </div>
            <div
              css={css`
                color: white;
                font-weight: 500;
                text-align: center;
              `}
            >
              {stat.count}
            </div>
            <div
              css={css`
                color: ${getPlacementColor(stat.averagePlacement)};
                font-weight: 600;
                text-align: center;
              `}
            >
              #{stat.averagePlacement.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
