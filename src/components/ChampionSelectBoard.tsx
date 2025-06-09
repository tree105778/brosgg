import styles from '@/components/SelectionBoard.module.css';
import { RefreshCw, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChangeEvent, useState } from 'react';
import { Champion } from '@/types';
import Image from 'next/image';
import { getChoseong } from '@/lib/getChoseong';
import DraggableChampionImage from '@/components/builder/DraggableChampionImage';

export default function ChampionSelectBoard({
  champions,
  isDraggable = false,
}: {
  champions: Champion[];
  isDraggable?: boolean;
}) {
  const [costValue, setCostValue] = useState(0);
  const [championSearchText, setChampionSearchText] = useState('');
  const [processedChampions, setProcessedChampions] = useState(
    champions.sort((a, b) => a.id - b.id),
  );

  const searchChampions = (text: string) => {
    if (text === '') setProcessedChampions([...champions]);
    else {
      setProcessedChampions(
        [...champions].filter(
          (champion) =>
            champion.name.includes(text) ||
            getChoseong(champion.name).includes(text),
        ),
      );
    }
  };

  const costValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const costNumber = Number(e.target.value);
    setCostValue(costNumber);
    setProcessedChampions(
      [...champions].filter((champ) => champ.cost === costNumber),
    );
  };

  const onChangeSearchChampions = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    searchChampions(text);
    setChampionSearchText(text);
  };

  return (
    <>
      <div className={styles.boardSecondHeaderSection}>
        <div className={styles.boardSecondHeaderSearch}>
          <Search className="text-[#90999D] size-5" />
          <Input
            placeholder="챔피언 검색"
            className="border-none focus-visible:ring-transparent translate-x-[-6px] w-[125px] placeholder-white font-bold"
            value={championSearchText}
            onChange={onChangeSearchChampions}
          />
        </div>
        <div className={styles.boardSynergySelect}>
          <Select>
            <SelectTrigger className="border-none focus-visible:ring-transparent !h-[1.5rem] !pr-1 font-bold w-full">
              <SelectValue placeholder="계열시너지" />
            </SelectTrigger>
          </Select>
        </div>
        <div className={styles.boardSynergySelect}>
          <Select>
            <SelectTrigger className="border-none focus-visible:ring-transparent !h-[1.5rem] !pr-1 font-bold w-full">
              <SelectValue placeholder="직업시너지" />
            </SelectTrigger>
          </Select>
        </div>
        <div className={styles.boardCostSelect}>
          <p>코스트</p>
          {Array.from({ length: 5 }).map((_, idx) => (
            <label
              key={idx + 1}
              className={`${costValue === idx + 1 && 'text-orange-500'} cursor-pointer size-8 bg-[#333] rounded-full flex justify-center items-center`}
              onClick={() => setCostValue(idx + 1)}
            >
              <input
                type="radio"
                name="cost"
                value={idx + 1}
                onChange={costValueChange}
              />
              {idx + 1}
            </label>
          ))}
        </div>
        <button
          className={styles.boardFilterInitializeButton}
          onClick={() => {
            setChampionSearchText('');
            setCostValue(0);
            setProcessedChampions([...champions]);
          }}
        >
          <RefreshCw />
          필터 초기화
        </button>
      </div>
      <div className={styles.championDisplaySection}>
        {processedChampions.map((champion) => (
          <div
            key={champion.id}
            className="flex flex-col justify-center gap-2 mr-[-30px]"
          >
            {isDraggable ? (
              <DraggableChampionImage champion={champion} />
            ) : (
              <>
                <Image
                  src={champion.image}
                  alt={champion.name}
                  width={60}
                  height={60}
                  className="object-cover rounded-md"
                />
                <p className="text-center w-[60px] !text-[0.75rem] font-bold text-white truncate">
                  {champion.name}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
