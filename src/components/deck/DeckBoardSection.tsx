import { useMemo } from 'react';
import { css } from '@emotion/react';
import type { DeckBoard } from '@/types/api';
import ChampionBoardGrid from '@/components/builder/ChampionBoardGrid';
import ChampionHexagonContainer from '@/components/common/ChampionHexagonContainer';
import { convertUnitToChampionProp } from '@/lib/deckUtils';
import { ChampionHexagonContainerProp } from '@/types/prop';

interface DeckBoardSectionProps {
  board: DeckBoard | undefined;
}

export function DeckBoardSection({ board }: DeckBoardSectionProps) {
  const boardUnitMap = useMemo(() => {
    if (!board) {
      return new Map<string, ChampionHexagonContainerProp>();
    }

    return board.units.reduce((map, unit) => {
      const key = `${unit.position.row},${unit.position.col}`;
      map.set(key, convertUnitToChampionProp(unit));
      return map;
    }, new Map<string, ChampionHexagonContainerProp>());
  }, [board]);

  if (!board || board.units.length === 0) {
    return (
      <div
        css={css`
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
          color: #9ca3af;
        `}
      >
        해당 레벨의 보드 정보가 없습니다.
      </div>
    );
  }

  return (
    <div
      css={css`
        width: 100%;
        transform: translateX(15px);
      `}
    >
      <ChampionBoardGrid>
        {(X, Y) => {
          const key = `${X},${Y}`;
          const champion = boardUnitMap.get(key);

          return champion ? (
            <ChampionHexagonContainer champion={champion} />
          ) : (
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
                width: 100%;
                height: 100%;
                background-color: #000;
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
                  background-color: var(--bg-theme4);
                `}
              ></div>
            </div>
          );
        }}
      </ChampionBoardGrid>
    </div>
  );
}
