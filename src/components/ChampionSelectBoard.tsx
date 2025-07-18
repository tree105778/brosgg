import styles from '@/components/SelectionBoard.module.css';
import traits from '@/data/trait_type_s14.json';
import classes from '@/data/class_type_s14.json';
import { RefreshCw, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChangeEvent, useReducer } from 'react';
import { Champion } from '@/types';
import Image from 'next/image';
import { getChoseong } from '@/lib/getChoseong';
import DraggableChampionImage from '@/components/builder/DraggableChampionImage';

type FilterState = {
  championSearchText: string;
  traitValue: string;
  classValue: string;
  costValue: number;
};

type FilterAction =
  | { type: 'championSearchText'; payload: string }
  | { type: 'traitValue'; payload: string }
  | { type: 'classValue'; payload: string }
  | { type: 'costValue'; payload: number }
  | { type: 'reset' };

const initialFilterState: FilterState = {
  championSearchText: '',
  traitValue: '',
  classValue: '',
  costValue: 0,
};

function reducer(state: FilterState, action: FilterAction) {
  switch (action.type) {
    case 'championSearchText':
    case 'traitValue':
    case 'classValue':
      console.log(`${action.type}: ${action.payload}`);
      return { ...state, [action.type]: action.payload };
    case 'costValue':
      return { ...state, costValue: action.payload };
    case 'reset':
      return initialFilterState;
    default:
      return state;
  }
}

export default function ChampionSelectBoard({
  champions,
  isDraggable = false,
}: {
  champions: Champion[];
  isDraggable?: boolean;
}) {
  const [{ championSearchText, classValue, costValue, traitValue }, dispatch] =
    useReducer(reducer, initialFilterState);

  const fns = {
    championSearchText: (c: Champion) =>
      championSearchText === '' ||
      c.name.includes(championSearchText) ||
      getChoseong(c.name).includes(championSearchText),
    trait: (c: Champion) => traitValue === '' || c.traits.includes(traitValue),
    class: (c: Champion) => classValue === '' || c.traits.includes(classValue),
    cost: (c: Champion) => costValue === 0 || c.cost === costValue,
  };

  const processedChampions = champions.filter((c) =>
    Object.values(fns).every((fn) => fn(c)),
  );

  const costValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const costNumber = Number(e.target.value);
    dispatch({ type: 'costValue', payload: costNumber });
  };

  const onChangeSearchChampions = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    dispatch({ type: 'championSearchText', payload: text });
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
          <Select
            value={traitValue}
            onValueChange={(v) => dispatch({ type: 'traitValue', payload: v })}
          >
            <SelectTrigger className="border-none focus-visible:ring-transparent !h-[1.5rem] !pr-1 font-bold w-full">
              <SelectValue placeholder="계열시너지" />
            </SelectTrigger>
            <SelectContent className="!border-y !mt-2">
              {traits.map((trait) => (
                <SelectItem key={trait.id} value={trait.trait}>
                  {trait.trait}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className={styles.boardSynergySelect}>
          <Select
            value={classValue}
            onValueChange={(v) => dispatch({ type: 'classValue', payload: v })}
          >
            <SelectTrigger className="border-none focus-visible:ring-transparent !h-[1.5rem] !pr-1 font-bold w-full">
              <SelectValue placeholder="직업시너지" />
            </SelectTrigger>
            <SelectContent className="!border-y !mt-2">
              {classes.map((cl) => (
                <SelectItem value={cl.class} key={cl.id}>
                  {cl.class}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className={styles.boardCostSelect}>
          <p>코스트</p>
          {Array.from({ length: 5 }).map((_, idx) => (
            <label
              key={idx + 1}
              className={`${costValue === idx + 1 && 'text-orange-500'} cursor-pointer size-8 bg-[#333] rounded-full flex justify-center items-center`}
              onClick={() => dispatch({ type: 'costValue', payload: idx + 1 })}
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
            dispatch({ type: 'reset' });
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
