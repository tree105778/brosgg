import { css } from '@emotion/react';
import { MatchSummary } from '@/types/api';
import ChampionHexagonContainer from '../common/ChampionHexagonContainer';
import { useState } from 'react';

interface MatchHistoryProps {
  matches: MatchSummary[];
}

const getPlacementColor = (placement: number) => {
  if (placement === 1) return '#06F1D1'; // 금색
  if (placement <= 4) return '#8BA3AD'; // 청록색
  return '#FF4444'; // 빨간색
};

const getPlacementBgColor = (placement: number) => {
  if (placement === 1) return '#223B37'; // 어두운 청록색
  if (placement <= 4) return '#282828';
  return '#391E1E'; // 어두운 빨간색
};

export default function MatchHistory({ matches }: MatchHistoryProps) {
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);

  const formatPlayedAt = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}일 전`;
    } else if (diffHours > 0) {
      return `${diffHours}시간 전`;
    } else {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins}분 전`;
    }
  };

  const formatGameDuration = (timestamp: number) => {
    // Mock duration calculation - in real scenario, use gameDurationSeconds from MatchDetail
    return '25:42';
  };

  const getChampionImage = (characterId: string) => {
    const championName = characterId.split('_').pop() || characterId;
    return `https://d18kctlbb86miz.cloudfront.net/champions/${championName}.png`;
  };

  const toggleExpand = (matchId: string) => {
    setExpandedMatch(expandedMatch === matchId ? null : matchId);
  };

  return (
    <div
      css={css`
        width: 100%;
        margin-top: 1.5rem;
      `}
    >
      {matches.map((match) => (
        <div
          key={match.matchId}
          css={css`
            background-color: ${getPlacementBgColor(match.placement)};
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 0.75rem;
            position: relative;
          `}
        >
          {/* Main content */}
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 1.5rem;
            `}
          >
            {/* Placement section */}
            <div
              css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                min-width: 50px;
              `}
            >
              <div
                css={css`
                  font-size: 1.25rem;
                  font-weight: bold;
                  color: ${getPlacementColor(match.placement)};
                  line-height: 1;
                `}
              >
                {match.placement}위
              </div>
              <div
                css={css`
                  font-size: 0.875rem;
                  color: var(--text-theme1);
                  margin-top: 0.25rem;
                `}
              >
                랭크
              </div>
            </div>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                //min-width: 100px;
                gap: 0.5rem;
              `}
            >
              <div
                css={css`
                  font-size: 0.875rem;
                  color: var(--text-theme1);
                `}
              >
                {formatPlayedAt(match.gameDatetime)}
              </div>
              <div
                css={css`
                  font-size: 0.875rem;
                  color: var(--text-theme1);
                `}
              >
                {formatGameDuration(match.gameDatetime)}
              </div>
            </div>
            {/* Champions section */}
            <div
              css={css`
                display: flex;
                gap: 0.75rem;
                flex: 1;
                flex-wrap: wrap;
              `}
            >
              {match.units.slice(0, 8).map((unit, idx) => (
                <div
                  key={idx}
                  css={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                  `}
                >
                  <ChampionHexagonContainer
                    champion={{
                      name: unit.displayName,
                      cost: unit.cost,
                      image: getChampionImage(unit.characterId),
                      items: unit.items.slice(0, 3).map((item) => ({
                        itemName: item.displayName,
                        itemImgSrc: item.iconUrl,
                      })),
                      tier: unit.tier,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Expand button */}
            <button
              onClick={() => toggleExpand(match.matchId)}
              css={css`
                background: transparent;
                border: none;
                cursor: pointer;
                padding: 0.5rem;
                color: var(--text-theme1);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.2s;
                transform: ${expandedMatch === match.matchId
                  ? 'rotate(180deg)'
                  : 'rotate(0deg)'};

                &:hover {
                  color: var(--text-theme2);
                }
              `}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>

          {/* Expanded section */}
          {expandedMatch === match.matchId && (
            <div
              css={css`
                margin-top: 1.5rem;
                padding-top: 1.5rem;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
              `}
            >
              <div
                css={css`
                  display: flex;
                  flex-wrap: wrap;
                  gap: 0.5rem;
                `}
              >
                {match.traits.map((trait, idx) => (
                  <div
                    key={idx}
                    css={css`
                      display: inline-flex;
                      align-items: center;
                      gap: 0.5rem;
                      padding: 0.25rem 0.75rem;
                      border-radius: 16px;
                      font-size: 0.875rem;
                      background-color: ${trait.style === 3
                        ? '#FFD700'
                        : trait.style === 2
                          ? '#C0C0C0'
                          : '#CD7F32'};
                      color: #1e1e1e;
                      font-weight: 600;
                    `}
                  >
                    {trait.displayName} {trait.numUnits}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
