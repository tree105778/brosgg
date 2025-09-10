import { Champion } from '@/types';
import { useDrag } from 'react-dnd';
import Image from 'next/image';
import styles from './DraggableChampionImage.module.css';
import { memo } from 'react';

function DraggableChampionImage({ champion }: { champion: Champion }) {
  const { id, name, cost, traits, image } = champion;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CHAMPION',
    item: {
      id,
      name,
      cost,
      traits,
      image,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <>
      <div className={styles.draggableImageWrapper}>
        <Image
          ref={(node) => {
            if (node) {
              drag(node);
            }
          }}
          src={champion.image}
          alt={champion.name}
          width={60}
          height={60}
          className="object-cover rounded-md"
        />
        <p className="text-center w-[60px] !text-[0.75rem] font-bold text-white truncate">
          {champion.name}
        </p>
      </div>
    </>
  );
}

export default memo(DraggableChampionImage);
