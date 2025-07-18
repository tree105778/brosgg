import { ChangeEvent, useReducer } from 'react';
import { FetchItems } from '@/types';
import { getChoseong } from '@/lib/getChoseong';
import { RefreshCw, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import filters from '@/data/item_filter_type_s14.json';
import styles from './SelectionBoard.module.css';
import Image from 'next/image';
import DraggableItemImage from '@/components/builder/DraggableItemImage';

type FilterState = {
  itemSearchText: string;
  filterValue: string;
};

type FilterAction =
  | { type: 'itemSearchText'; payload: string }
  | { type: 'filterValue'; payload: string }
  | { type: 'reset' };

const initialFilterState: FilterState = {
  itemSearchText: '',
  filterValue: 'BASE&COMBINED',
};

function reducer(state: FilterState, action: FilterAction) {
  switch (action.type) {
    case 'itemSearchText':
    case 'filterValue':
      return { ...state, [action.type]: action.payload };
    case 'reset':
      return initialFilterState;
    default:
      return state;
  }
}

export default function ItemSelectBoard({
  items,
  isDraggable = false,
}: {
  items: FetchItems[];
  isDraggable?: boolean;
}) {
  const [{ itemSearchText, filterValue }, dispatch] = useReducer(
    reducer,
    initialFilterState,
  );

  const fns = {
    search: (i: FetchItems) =>
      itemSearchText === '' ||
      i.name.includes(itemSearchText) ||
      getChoseong(i.name).includes(itemSearchText),
    classification: (i: FetchItems) => {
      if (filterValue === 'BASE&COMBINED') {
        return i.type === 'BASE' || i.type === 'COMBINED';
      }
      return i.type === filterValue;
    },
  };
  const processedItems = items.filter((i) =>
    Object.values(fns).every((fn) => fn(i)),
  );

  const onChangeSearchItems = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    dispatch({ type: 'itemSearchText', payload: text });
  };

  return (
    <>
      <div className={styles.boardItemFilterSection}>
        <div className={styles.boardItemHeaderSearch}>
          <Search className="text-[#90999D] size-4" />
          <Input
            placeholder="아이템 검색"
            className="border-none focus-visible:ring-transparent translate-x-[-6px] w-[200px] placeholder-[#C0C4C6] font-bold"
            value={itemSearchText}
            onChange={onChangeSearchItems}
          />
        </div>
        {filters.map((filter, idx) => (
          <button
            key={idx}
            onClick={() => {
              console.log(filter.type);
              dispatch({ type: 'filterValue', payload: filter.type });
            }}
            className={`${styles.boardItemFilterButton} ${filterValue === filter.type ? 'bg-[#06F1D2] text-[#2A2A2A]' : 'bg-[#2A2929] text-[#C0C4C6]'}`}
            value={filter.type}
          >
            {filter.name}
          </button>
        ))}
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
      <div className={styles.itemDisplaySection}>
        {processedItems.map((item) => {
          if (!isDraggable)
            return (
              <Image
                key={item.id}
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
              />
            );
          return <DraggableItemImage key={item.id} item={item} />;
        })}
      </div>
    </>
  );
}
