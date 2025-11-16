import { MetaDeckSummary } from '@/types/api';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import ChampionHexagonContainer from '@/components/common/ChampionHexagonContainer';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface DeckCardProps {
  deck: MetaDeckSummary;
}

export default function DeckCard({ deck }: DeckCardProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    if (deck.deckId) {
      router.push(`/deck/${deck.deckId}`);
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'S':
        return '#FF6B6B';
      case 'A':
        return '#FFA726';
      case 'B':
        return '#FFEB3B';
      case 'C':
        return '#66BB6A';
      case 'D':
        return '#42A5F5';
      default:
        return '#757575';
    }
  };

  return (
    <div
      onClick={handleCardClick}
      css={css`
        background-color: #111111;
        border-radius: 0.5rem;
        padding: 1.5rem;
        margin-bottom: 1rem;
        transition: all 0.3s ease;
        cursor: ${deck.deckId ? 'pointer' : 'default'};

        &:hover {
          background-color: #1a1a1a;
        }
      `}
    >
      <div className="flex items-center gap-4">
        {/* Tier Badge */}
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            color: black;
            width: 4rem;
            height: 100%;
            min-height: 100px;
            background-color: ${getTierColor(deck.tier)};
            font-size: 1.5rem;
            border-radius: 0.5rem;
            flex-shrink: 0;
          `}
        >
          {deck.tier}
        </div>

        {/* Deck Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white text-xl font-bold">{deck.title}</h3>
          </div>

          {/* Synergies */}
          <div className="flex gap-2 mb-3 flex-wrap">
            {deck.synergies?.map(
              (synergy: { name: string; count: number }, idx: number) => (
                <div
                  key={idx}
                  css={css`
                    background-color: #2a2a2a;
                    border: 1px solid #444;
                    border-radius: 0.25rem;
                    padding: 0.25rem 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                  `}
                >
                  <span className="text-white text-sm">{synergy.name}</span>
                  <span
                    css={css`
                      background-color: var(--text-theme2);
                      color: black;
                      padding: 0.125rem 0.5rem;
                      border-radius: 0.25rem;
                      font-size: 0.75rem;
                      font-weight: bold;
                    `}
                  >
                    {synergy.count}
                  </span>
                </div>
              ),
            )}
          </div>

          {/* Champions */}
          <div className="flex gap-2 overflow-x-auto">
            {deck.champions?.map(
              (
                champion: {
                  championId: string;
                  name: string;
                  cost: number;
                  imageUrl: string;
                  items: any[];
                },
                idx: number,
              ) => (
                <ChampionHexagonContainer
                  key={idx}
                  champion={{
                    cost: champion.cost,
                    name: champion.name,
                    image: champion.imageUrl,
                    items: champion.items,
                  }}
                />
              ),
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mr-4">
          <div className="flex flex-col gap-1 items-center">
            <p className="text-gray-400 text-sm">평균 순위</p>
            <p className="text-white font-bold text-lg">
              {deck.avgPlacement?.toFixed(1) || 'N/A'}
            </p>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <p className="text-gray-400 text-sm">승방 확률</p>
            <p className="text-white font-bold text-lg">
              {deck.top4Rate?.toFixed(1) || 'N/A'}%
            </p>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <p className="text-gray-400 text-sm">1등 확률</p>
            <p className="text-white font-bold text-lg">
              {deck.firstRate?.toFixed(1) || 'N/A'}%
            </p>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <p className="text-gray-400 text-sm">픽률</p>
            <p className="text-white font-bold text-lg">
              {deck.pickRate?.toFixed(1) || 'N/A'}%
            </p>
          </div>
        </div>

        {/* Expand Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          css={css`
            background-color: #2a2a2a;
            border: 1px solid #444;
            border-radius: 0.5rem;
            padding: 0.5rem 1rem;
            color: white;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s ease;
            cursor: pointer;

            &:hover {
              background-color: #333;
            }
          `}
        >
          <ChevronDown
            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && deck.description && (
        <div
          css={css`
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid #333;
          `}
        >
          <h4 className="text-white font-semibold mb-2">덱 설명</h4>
          <p className="text-gray-300">{deck.description}</p>
        </div>
      )}
    </div>
  );
}
