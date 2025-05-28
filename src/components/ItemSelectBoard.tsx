import { ChangeEvent, useState } from 'react';
import { FetchItems } from '@/types';
import { getChoseong } from '@/lib/getChoseong';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import styles from './SelectionBoard.module.css';
import Image from 'next/image';

export default function ItemSelectBoard({ items }: { items: FetchItems[] }) {
  const [itemSearchText, setItemSearchText] = useState('');
  const [processedItems, setProcessedItems] = useState(
    [...items].sort((a, b) => a.id - b.id),
  );

  const searchItems = (text: string) => {
    if (text === '') setProcessedItems([...items]);
    else {
      setProcessedItems(
        [...items].filter(
          (item) =>
            item.name.includes(text) || getChoseong(item.name).includes(text),
        ),
      );
    }
  };

  const onChangeSearchItems = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    searchItems(text);
    setItemSearchText(text);
  };

  return (
    <>
      <div className={styles.boardItemHeaderSearch}>
        <Search className="text-[#90999D] size-4" />
        <Input
          placeholder="아이템명으로 검색"
          className="border-none focus-visible:ring-transparent translate-x-[-6px] w-[125px] placeholder-white font-bold"
          value={itemSearchText}
          onChange={onChangeSearchItems}
        />
      </div>
      <div className={styles.itemDisplaySection}>
        {processedItems.map((item) => (
          <Image
            key={item.id}
            src={item.image}
            alt={item.name}
            width={60}
            height={60}
          />
        ))}
      </div>
    </>
  );
}
