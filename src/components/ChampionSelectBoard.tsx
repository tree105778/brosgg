import styles from '@/components/SelectionBoard.module.css';
import { RefreshCw, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChangeEvent, useState } from 'react';
import { FetchChampions } from '@/types';
import Image from 'next/image';
import { getChoseong } from '@/lib/getChoseong';

export default function ChampionSelectBoard({
  champions,
}: {
  champions: FetchChampions[];
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
          <Search className="text-[#90999D] size-4" />
          <Input
            placeholder="챔피언명으로 검색"
            className="border-none focus-visible:ring-transparent translate-x-[-6px] w-[125px] placeholder-white font-bold"
            value={championSearchText}
            onChange={onChangeSearchChampions}
          />
        </div>
        <div className={styles.boardSynergySelect}>
          <Select>
            <SelectTrigger className="border-none focus-visible:ring-transparent !h-[1.5rem] !pr-1 font-bold">
              <SelectValue placeholder="계열시너지" />
            </SelectTrigger>
          </Select>
        </div>
        <div className={styles.boardSynergySelect}>
          <Select>
            <SelectTrigger className="border-none focus-visible:ring-transparent !h-[1.5rem] !pr-1 font-bold">
              <SelectValue placeholder="직업시너지" />
            </SelectTrigger>
          </Select>
        </div>
        <div className={styles.boardCostSelect}>
          <p>코스트</p>
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx + 1}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCostValue(idx + 1)}
            >
              <div className="w-0.5 h-[2.4rem] bg-[#919A9E]"></div>
              <label
                className={`${costValue === idx + 1 && 'text-orange-500'}`}
              >
                <input
                  type="radio"
                  name="cost"
                  value={idx + 1}
                  onChange={costValueChange}
                />
                {idx + 1}
              </label>
            </div>
          ))}
          <div className="w-0.5 h-[2.4rem] bg-[#919A9E]"></div>
          <RefreshCw
            onClick={() => {
              setChampionSearchText('');
              setCostValue(0);
              setProcessedChampions([...champions]);
            }}
          />
        </div>
      </div>
      <div className={styles.championDisplaySection}>
        {processedChampions.map((champion) => (
          <div
            key={champion.id}
            className="flex flex-col justify-center gap-2 mr-[-30px]"
          >
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
          </div>
        ))}
      </div>
    </>
  );
}
