import { FetchItems } from '@/types';
import { useDrag } from 'react-dnd';
import Image from 'next/image';

export default function DraggableItemImage({ item }: { item: FetchItems }) {
  const { id, name, image, type, effects } = item;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: {
      id,
      name,
      image,
      type,
      effects,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <>
      <div>
        <Image
          ref={(node) => {
            if (node) drag(node);
          }}
          key={item.id}
          src={item.image}
          alt={item.name}
          width={60}
          height={60}
        />
      </div>
    </>
  );
}
