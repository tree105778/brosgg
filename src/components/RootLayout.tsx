import { ReactNode, useState } from 'react';
import styles from './RootLayout.module.css';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe, Menu, Moon, Search } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/router';

export default function RootLayout({ children }: { children: ReactNode }) {
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
    <>
      <div className={styles.headerSection}>
        <Link href={'/'} className={styles.navBarIcon} />
        <nav className={styles.navBar}>
          <Link href={'/'}>HOME</Link>
          <Link href="/meta">메타 추천</Link>
          <Link href="/rank">랭킹</Link>
          <div>게임가이드</div>
          <Link href="/patchnote">패치노트</Link>
          <Link href={'/builder'}>배치툴</Link>
          <div>커뮤니티</div>
        </nav>
        <div className={styles.navBarSearchContainer}>
          <Select>
            <SelectTrigger className="border-none focus-visible:ring-transparent">
              <SelectValue placeholder="KR" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem defaultChecked value="KR">
                KR
              </SelectItem>
              <SelectItem value="NA">NA</SelectItem>
              <SelectItem value="EU">EU</SelectItem>
            </SelectContent>
          </Select>
          <div className="w-[2px] h-[30px] translate-x-[-6px] bg-[#595959]"></div>
          <Input
            type="text"
            placeholder="플레이어 명으로 검색"
            className="border-none w-[250px] focus-visible:ring-transparent translate-x-[-6px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Search onClick={handleSearch} className="cursor-pointer" />
        </div>
        <div className={styles.navBarIconContainer}>
          <Moon className="text-[#06efd0] size-[1.5rem] m-0" />
          <Globe className="text-[#06efd0] size-[1.5rem] m-0" />
        </div>
        <div className={styles.dropdownMenu}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Menu size={40} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-6 text-2xl bg-white">
              <DropdownMenuItem>
                <Link href={'/'}>HOME</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/meta">메타 추천</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/rank">랭킹</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div>게임가이드</div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div>패치노트</div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={'/builder'}>배치툴</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div>커뮤니티</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {children}
      <div className={styles.footerSection}>
        <p>주식회사 브로스지지(BROS.GG)</p>
        <p>
          통신판매업신고 :제2025-경기부천-00000호ㅣ사업자등록번호
          :000-00-00000ㅣ대표자 :박주혁
        </p>
        <p>
          경기 부천시 원미구 소사로 487 2층 (BROS.GG)ㅣ전화 : 02-999-9999 (평일
          10:00 ~ 18:00)ㅣ이메일 : tftbro@bros.gg
        </p>
        <br />
        <p>
          © 2025 BROS.GG. BROS.GG is not endorsed by Riot Games and does not
          reflect the views or opinions of Riot Games or anyone officially
          involved in producing or managing League of Legends. League of Legends
          and Riot Games are trademarks or registered trademarks of Riot Games,
          Inc. League of Legends © Riot Games, Inc.
        </p>
      </div>
    </>
  );
}
