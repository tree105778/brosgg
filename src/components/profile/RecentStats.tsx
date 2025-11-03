import { css } from '@emotion/react';

interface RecentStatsProps {
  matchCount: number;
  averagePlacement: number;
  firstPlaceCount: number;
  top4Count: number;
  placementDistribution: number[];
}

export default function RecentStats({
  matchCount,
  averagePlacement,
  firstPlaceCount,
  top4Count,
  placementDistribution,
}: RecentStatsProps) {
  // Calculate the maximum value for scaling the bars
  const maxPlacement = Math.max(...placementDistribution);

  return (
    <div
      css={css`
        background-color: var(--bg-theme3);
        border-radius: 8px;
        padding: 1.5rem;
        width: 100%;
        height: 100%;
      `}
    >
      <h2
        css={css`
          font-size: 1.25rem;
          font-weight: bold;
          color: var(--bg-theme2);
          margin: 0 0 1.5rem 0;
        `}
      >
        최근 {matchCount}게임
      </h2>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <span
            css={css`
              font-size: 0.875rem;
              color: #999999;
            `}
          >
            평균 등수
          </span>
          <span
            css={css`
              font-size: 1rem;
              font-weight: 600;
              color: white;
            `}
          >
            {averagePlacement.toFixed(1)}
          </span>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <span
            css={css`
              font-size: 0.875rem;
              color: #999999;
            `}
          >
            1등 횟수
          </span>
          <span
            css={css`
              font-size: 1rem;
              font-weight: 600;
              color: white;
            `}
          >
            {firstPlaceCount}
          </span>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <span
            css={css`
              font-size: 0.875rem;
              color: #999999;
            `}
          >
            순방 횟수
          </span>
          <span
            css={css`
              font-size: 1rem;
              font-weight: 600;
              color: white;
            `}
          >
            {top4Count}
          </span>
        </div>
        <div>
          <p
            css={css`
              font-size: 0.875rem;
              color: #999999;
              margin-bottom: 1rem;
            `}
          >
            순위 분포
          </p>
          <div
            css={css`
              display: flex;
              align-items: flex-end;
              justify-content: space-between;
              gap: 0.5rem;
            `}
          >
            {placementDistribution.map((count, index) => {
              const percentage = (count / matchCount) * 100;
              return (
                <div
                  key={index}
                  css={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                  `}
                >
                  {count > 0 && (
                    <div
                      css={css`
                        font-size: 0.75rem;
                        font-weight: 600;
                        //color: white;
                        white-space: nowrap;
                      `}
                    >
                      {count}
                    </div>
                  )}
                  <div
                    css={css`
                      width: 100%;
                      background-color: #1db59f;
                      border-radius: 4px 4px 0 0;
                      height: ${(percentage / 100) * 400}px;
                      transition: height 0.3s ease;

                      &:hover {
                        opacity: 0.8;
                      }
                    `}
                  ></div>
                  <span
                    css={css`
                      font-size: 0.875rem;
                      color: #999999;
                      font-weight: 500;
                    `}
                  >
                    #{index + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
