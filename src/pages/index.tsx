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
import { fetchChampionsFromBackend, fetchItemsFromBackend } from '@/lib/api';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { initServerMock } from '@/mocks/server';
import SelectionBoard from '@/components/SelectionBoard';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const getStaticProps = (async () => {
  initServerMock();

  const champions = await fetchChampionsFromBackend();
  const items = await fetchItemsFromBackend();

  return { props: { champions, items } };
}) satisfies GetStaticProps;

export default function Home({
  champions,
  items,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    // gameName#tagLine 형식을 gameName-tagLine으로 변환
    const formattedQuery = searchQuery.trim().replace('#', '-');
    router.push(`/profile/${formattedQuery}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.mainSection}>
      <Image
        width={100}
        height={100}
        src={subLogo}
        alt="GG"
        className="md:w-[100px] md:h-[100px] sm:w-[80px] sm:h-[80px]"
      />
      <div className={styles.searchBarContainer}>
        <Select>
          <SelectTrigger className="border-none focus-visible:ring-transparent md:!text-2xl sm:!text-lg [&_svg:not(.my-icon)]:hidden">
            <SelectValue placeholder="KR" />
            <ChevronDown className="md:size-8 sm:size-6 my-icon" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem defaultChecked={true} value="KR">
              KR
            </SelectItem>
            <SelectItem value="NA">NA</SelectItem>
            <SelectItem value="EU">EU</SelectItem>
          </SelectContent>
        </Select>
        <div className="w-[2px] md:h-[2.75rem] sm:h-[2rem] translate-x-[-6px] bg-[#595959]"></div>
        <Input
          type="text"
          placeholder="플레이어 명으로 검색"
          className="border-none w-[250px] md:h-12 sm:h-10 focus-visible:ring-transparent flex-[1] md:!text-2xl sm:!text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Search
          className="md:size-10 sm:size-8 cursor-pointer"
          onClick={handleSearch}
        />
      </div>
      <div className="w-full flex items-end md:gap-6 sm:gap-3">
        <p className="md:!text-3xl sm:!text-xl font-bold">TODAY PICK</p>
        <p className="md:leading-8 sm:leading-6 md:text-base sm:text-sm">
          오늘은 이 덱 어때요?
        </p>
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
