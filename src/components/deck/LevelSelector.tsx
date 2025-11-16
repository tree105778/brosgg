import { css } from '@emotion/react';

interface LevelSelectorProps {
  selectedLevel: number;
  onLevelChange: (level: number) => void;
  availableLevels: number[];
}

export function LevelSelector({
  selectedLevel,
  onLevelChange,
  availableLevels,
}: LevelSelectorProps) {
  const sortedLevels = [...availableLevels].sort((a, b) => a - b);

  return (
    <div
      css={css`
        display: flex;
        gap: 0.5rem;
        margin: 1.5rem 0 1.5rem;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
      `}
    >
      {sortedLevels.map((level) => {
        const isSelected = selectedLevel === level;
        return (
          <button
            key={level}
            onClick={() => onLevelChange(level)}
            css={css`
              font-size: 1.75rem;
              border-radius: 4px;
              font-weight: 600;
              transition: background-color 0.2s;
              color: ${isSelected && '#06F1D1'};
              text-decoration: ${isSelected && 'underline'};
              text-decoration-thickness: 4px;
              text-underline-offset: 4px;

              &:hover {
                color: ${isSelected || '#06F1D1'};
              }
            `}
          >
            LV.{level}
          </button>
        );
      })}
    </div>
  );
}
