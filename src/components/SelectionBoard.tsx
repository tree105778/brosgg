import { FetchChampions, FetchItems } from '@/types';
import styles from './SelectionBoard.module.css';
import ChampionSelectBoard from '@/components/ChampionSelectBoard';
import ItemSelectBoard from '@/components/ItemSelectBoard';
import MetaSelectBoard from '@/components/meta/MetaSelectBoard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SelectionBoard({
  champions,
  items,
}: {
  champions: FetchChampions[] | null;
  items: FetchItems[] | null;
}) {
  return (
    <div className={styles.boardWrapper}>
      <div className={styles.boardHeaderSection}>
        <h1 className="!text-white !text-[1.8rem] font-bold">QUICK PICK</h1>
        <p className="!ml-3">상황별 덱 추천</p>
      </div>
      <Tabs defaultValue="champion">
        <TabsList className="!mx-auto rounded-none !border-b-2 !border-b-[#2C2C2C] gap-16 !mt-6 !mb-4 !pb-4">
          <TabsTrigger
            className="text-[1.5rem] px-0 data-[state=active]:text-[#06F1D2] data-[state=active]:underline underline-offset-17"
            value="champion"
          >
            챔피언
          </TabsTrigger>
          <TabsTrigger
            className="text-[1.5rem] px-0 data-[state=active]:text-[#06F1D2] data-[state=active]:underline underline-offset-17"
            value="item"
          >
            아이템
          </TabsTrigger>
          <TabsTrigger
            className="text-[1.5rem] px-0 data-[state=active]:text-[#06F1D2] data-[state=active]:underline underline-offset-17"
            value="meta"
          >
            추천 메타
          </TabsTrigger>
        </TabsList>
        {champions && (
          <TabsContent value="champion">
            <ChampionSelectBoard champions={champions} />
          </TabsContent>
        )}
        {items && (
          <TabsContent value="item">
            <ItemSelectBoard items={items} />
          </TabsContent>
        )}
        <TabsContent value="meta">
          <MetaSelectBoard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
