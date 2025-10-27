import { useDrag, useDrop } from 'react-dnd';
import { useChampionAndIndexStore, useTraitsStateStore } from '@/store';
import type { Champion, Item } from '@/types';
import DraggableContainerItem from './DraggableContainerItem';
import { isItemDroppable, itemCombineProcess } from '@/lib/item';
import Image from 'next/image';
import styles from './DroppableChampionBoard.module.css';

export default function DroppableChampionBoard({
  X,
  Y,
}: {
  X: number;
  Y: number;
}) {
  const champion = useChampionAndIndexStore(
    (state) => state.championAndIndex[`${X},${Y}`],
  );
  const { setChampionIndex, removeChampionIndex } = useChampionAndIndexStore();
  const { addTraitsState, removeTraitsState } = useTraitsStateStore();

  const costColor: { [key: number]: string } = {
    1: '#595959',
    2: '#03937F',
    3: '#1287CF',
    4: '#9A30AE',
    5: '#FFB700',
  };

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: 'CHAMPION',
      canDrop: () => !champion,
      drop: (item: Champion) => {
        if (!item.star) item.star = 1;
        setChampionIndex(X, Y, item);
        addTraitsState(item);
      },
      collect: (monitor) => ({
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver(),
      }),
    }),
    [champion],
  );

  const [, dropItem] = useDrop(
    {
      accept: 'ITEM',
      canDrop: () => !!champion && isItemDroppable(champion),
      drop: (item: Item) => {
        if (champion) {
          const newItem = itemCombineProcess(champion, item);
          const newChampion: Champion = {
            ...champion,
            item: newItem,
          };
          setChampionIndex(X, Y, newChampion);
        }
      },
    },
    [champion],
  );

  const [, drag] = useDrag<Champion, void, { isDragging: boolean }>(
    () => ({
      type: 'CHAMPION',
      item: {
        id: champion?.id || 0,
        name: champion?.name || '',
        cost: champion?.cost || 0,
        traits: champion?.traits || [],
        image: champion?.image || '',
        star: champion?.star,
        item: champion?.item,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (_, monitor) => {
        const diff = monitor.getDifferenceFromInitialOffset();
        const diff_x = Math.abs(diff?.x || 51);
        const diff_y = Math.abs(diff?.y || 51);
        if (champion && (diff_x > 50 || diff_y > 50)) {
          removeChampionIndex(X, Y);
          removeTraitsState(champion);
        }
      },
    }),
    [champion],
  );

  const starHandleClick = () => {
    if (champion) {
      const newStar = (champion.star || 0) + 1;
      setChampionIndex(X, Y, { ...champion, star: newStar > 3 ? 1 : newStar });
    }
  };

  return (
    <div
      ref={(node) => {
        if (node && champion) {
          drag(node);
        }
      }}
      className="w-full h-full m-0 relative"
    >
      {champion && (
        <div
          className="absolute top-0 left-[50%] z-[1]"
          style={{ transform: 'translateX(-50%)' }}
          onClick={starHandleClick}
        >
          <div className="flex cursor-pointer gap-x-[2px]">
            {Array.from({ length: champion.star || 1 }).map((_, idx) => (
              <div
                key={idx}
                className="size-5 rounded-full border bg-black bg-no-repeat bg-center bg-[length:75%]"
                style={{ backgroundImage: 'url("/champion-star-1.jpeg")' }}
              ></div>
            ))}
          </div>
        </div>
      )}

      <div
        ref={(node) => {
          if (node) {
            drop(node);
            dropItem(node);
          }
        }}
        onContextMenu={(e) => {
          if (champion) {
            e.preventDefault();
            removeChampionIndex(X, Y);
            removeTraitsState(champion);
          }
        }}
        className="size-full"
      >
        {champion ? (
          <div
            className={styles.hexagon}
            style={{ backgroundColor: costColor[champion.cost] }}
          >
            <div className={styles.hexagonInner}>
              <Image
                width={60}
                height={60}
                src={champion.image}
                alt={champion.name}
                loading="eager"
                objectFit="cover"
              />
              <p className={styles.displayChampionName}>{champion.name}</p>
            </div>
          </div>
        ) : (
          <div
            className={`${styles.hexagon} ${isOver && canDrop ? 'bg-green-300' : styles.championBorderColor}`}
          >
            <div
              className={`${styles.hexagonInner} ${isOver && canDrop ? 'bg-green-300' : 'bg-[#222]'}`}
            ></div>
          </div>
        )}
      </div>

      {champion?.item && (
        <div className="absolute left-0 right-0 bottom-0">
          <div className="flex justify-center">
            {champion.item.map((item, idx) => (
              <DraggableContainerItem
                key={idx}
                idx={idx}
                X={X}
                Y={Y}
                item={item}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
