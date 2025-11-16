import styles from './ChampionBoardGrid.module.css';

export interface ChampionBoardGridProps {
  children: (X: number, Y: number) => React.ReactNode;
}

export default function ChampionBoardGrid({
  children,
}: ChampionBoardGridProps) {
  return (
    <div className={styles.builderBoardContainerWrapper}>
      <div className={styles.builderBoardContainer}>
        {Array.from({ length: 28 }).map((_, idx) => {
          const X = Math.floor(idx / 7);
          const Y = idx % 7;

          return (
            <div
              key={idx}
              className={`${styles.hexagonWrapper}${
                X % 2 === 1 ? ' ' + styles.offset : ''
              }`}
            >
              {children(X, Y)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
