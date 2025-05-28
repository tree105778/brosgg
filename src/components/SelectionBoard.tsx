import { FetchChampions, FetchItems } from '@/types';
import styles from './SelectionBoard.module.css';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ChampionSelectBoard from '@/components/ChampionSelectBoard';
import ItemSelectBoard from '@/components/ItemSelectBoard';

export default function SelectionBoard({
  champions,
  items,
}: {
  champions: FetchChampions[] | null;
  items: FetchItems[] | null;
}) {
  const [selectOpt, setSelectOpt] = useState('champion');

  return (
    <div className={styles.boardWrapper}>
      <div className={styles.boardHeaderSection}>
        <h1>QUICK PICK</h1>
        <div className={styles.boardHeaderSelect}>
          <Select
            value={selectOpt}
            onValueChange={(value) => setSelectOpt(value)}
          >
            <SelectTrigger className="border-none focus-visible:ring-transparent !text-[1rem] !h-[1.5rem] !w-[content] font-bold">
              <SelectValue placeholder="챔피언" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="champion">챔피언</SelectItem>
              <SelectItem value="item">아이템</SelectItem>
              <SelectItem value="meta">추천메타</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {selectOpt === 'champion' ? (
          <p>챔피언별 덱 추천</p>
        ) : (
          <p>아이템별 덱 추천</p>
        )}
      </div>
      {selectOpt === 'champion' && champions && (
        <ChampionSelectBoard champions={champions} />
      )}
      {selectOpt === 'item' && items && <ItemSelectBoard items={items} />}
    </div>
  );
}
