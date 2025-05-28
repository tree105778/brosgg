import Image from 'next/image';
import subLogo from '../../public/subLogo.png';
import styles from './index.module.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ChevronDown, Search } from 'lucide-react';
import Slider from '@/components/Slider';
import { fetchChampionsS14Data, fetchItemS14Data } from '@/lib/supabase';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import SelectionBoard from '@/components/SelectionBoard';

export const getStaticProps = (async () => {
  const champions = await fetchChampionsS14Data();
  const items = await fetchItemS14Data();

  return { props: { champions, items } };
}) satisfies GetStaticProps;

export default function Home({
  champions,
  items,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={styles.mainSection}>
      <Image width={100} height={100} src={subLogo} alt="GG" />
      <div className={styles.searchBarContainer}>
        <Select>
          <SelectTrigger className="border-none focus-visible:ring-transparent !text-2xl [&_svg:not(.my-icon)]:hidden">
            <SelectValue placeholder="KR" />
            <ChevronDown className="size-8 my-icon" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem defaultChecked={true} value="KR">
              KR
            </SelectItem>
            <SelectItem value="NA">NA</SelectItem>
            <SelectItem value="EU">EU</SelectItem>
          </SelectContent>
        </Select>
        <div className="w-[2px] h-[2.75rem] translate-x-[-6px] bg-[#595959]"></div>
        <Input
          type="text"
          placeholder="플레이어 명으로 검색"
          className="border-none w-[250px] h-12 focus-visible:ring-transparent flex-[1] !text-2xl"
        />
        <Search className="size-10" />
      </div>
      <div className="w-full flex items-end gap-6">
        <p className="!text-3xl font-bold">TODAY PICK</p>
        <p className="leading-8">오늘은 이 덱 어때요?</p>
      </div>
      <Slider />
      <div className={styles.advSection}>
        <Image
          src="https://brosgses.my.canva.site/champ-home/_assets/media/12509eb9a127a141cedee169e1e59aac.png"
          alt={'광고'}
          fill={true}
        />
      </div>
      <SelectionBoard champions={champions} items={items} />
      <div className={styles.advSection2}>
        <Image
          src={
            'https://brosgses.my.canva.site/i-home/_assets/media/75c043e0e8f28434edb4838808864434.png'
          }
          alt={'광고'}
          fill
        />
      </div>
    </div>
  );
}
