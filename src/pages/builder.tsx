import styles from './builder.module.css';
import { CirclePlus, RefreshCw, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchChampionsFromBackend, fetchItemsFromBackend } from '@/lib/api';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { initServerMock } from '@/mocks/server';
import ChampionSelectBoard from '@/components/ChampionSelectBoard';
import ItemSelectBoard from '@/components/ItemSelectBoard';
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { useChampionAndIndexStore, useTraitsStateStore } from '@/store';
import SynergyInfo from '@/components/builder/SynergyInfo';
import ChampionBoardGrid from '@/components/builder/ChampionBoardGrid';
import DroppableChampionBoard from '@/components/builder/DroppableChampionBoard';
import * as htmlToImage from 'html-to-image';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import Image from 'next/image';

export const getStaticProps = (async () => {
  initServerMock();

  const champions = await fetchChampionsFromBackend();
  const items = await fetchItemsFromBackend();
  return { props: { champions, items } };
}) satisfies GetStaticProps;

export default function Builder({
  champions,
  items,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { traits, removeAllTraitsState } = useTraitsStateStore();
  const resetAllChampionIndex = useChampionAndIndexStore(
    (state) => state.resetAllChampionIndex,
  );
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onClickCaptureButton = async () => {
    const captureElement = document.getElementById('capture-area');
    if (!captureElement) return;

    // 이전 스크린샷 초기화
    setScreenshotUrl('');

    // 약간의 딜레이 후 새로운 스크린샷 캡처 (DOM 업데이트 대기)
    await new Promise((resolve) => setTimeout(resolve, 100));

    const dataUrl = await htmlToImage.toSvg(captureElement, {
      cacheBust: true, // 캐시 방지를 위해 true로 변경
      backgroundColor: '#1a1a1a',
      // pixelRatio: 2,
    });

    setScreenshotUrl(dataUrl);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    // Dialog가 닫힐 때 스크린샷 초기화
    if (!open) {
      setScreenshotUrl('');
    }
  };

  return (
    <DndProvider options={HTML5toTouch}>
      <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
        <div className={styles.builderInfoHeaderSection}>
          <h1>배치툴</h1>
          <p>나만의 덱을 구성해 커뮤니티에 공유해보세요!</p>
        </div>
        <div className={styles.builderMainSection}>
          <div className={styles.builderFirstHeaderSection}>
            <button className={styles.headerCommonBtn}>로그인</button>
            <div className={styles.firstHeaderSnsBtn}>
              <DialogTrigger asChild>
                <button
                  className={styles.headerCommonBtn}
                  onClick={async () => {
                    setIsDialogOpen(true);
                    await onClickCaptureButton();
                  }}
                >
                  공유
                </button>
              </DialogTrigger>
              <button className={styles.firstHeaderSnsUploadBtn}>업로드</button>
            </div>
          </div>
          <div className={styles.builderSecondHeaderSection}>
            <button
              className={styles.secondHeaderInitialBtn}
              onClick={() => {
                removeAllTraitsState();
                resetAllChampionIndex();
              }}
            >
              초기화
              <RefreshCw />
            </button>
            <button className={styles.secondHeaderCommonBtn}>
              팀코드 복사
            </button>
            <button className={styles.secondHeaderCommonBtn}>
              팀코드 붙여넣기
            </button>
          </div>
          <div id="capture-area" className={styles.builderCaptureArea}>
            <div className={styles.traitSynergyInfoTab}>
              {traits.map((trait, idx) => (
                <SynergyInfo key={idx} trait={trait} />
              ))}
            </div>
            <div className={styles.argumentInputWrapper}>
              {Array.from({ length: 9 }).map((_, idx) => (
                <div key={idx}>
                  <CirclePlus size={30} className="text-[#8CA1AD]" />
                </div>
              ))}
            </div>
            <ChampionBoardGrid>
              {(X, Y) => <DroppableChampionBoard X={X} Y={Y} />}
            </ChampionBoardGrid>
          </div>
          <Tabs defaultValue="champion" className="w-full">
            <TabsList className="flex text-white mt-8">
              <TabsTrigger
                value="champion"
                className="text-2xl underline-offset-8 data-[state=active]:text-[#06F1D2] data-[state=active]:underline"
              >
                챔피언
              </TabsTrigger>
              <TabsTrigger
                value="item"
                className="text-2xl underline-offset-8 data-[state=active]:text-[#06F1D2] data-[state=active]:underline"
              >
                아이템
              </TabsTrigger>
            </TabsList>
            {champions && (
              <TabsContent value="champion">
                <ChampionSelectBoard champions={champions} isDraggable={true} />
              </TabsContent>
            )}
            {items && (
              <TabsContent value="item">
                <ItemSelectBoard items={items} isDraggable={true} />
              </TabsContent>
            )}
          </Tabs>
        </div>
        <DialogContent
          className="bg-[#2a2929] md:!max-w-[800px] sm:!max-w-[95vw]"
          showCloseButton={false}
        >
          <div className="flex justify-between items-center md:!p-4 sm:!p-2 w-full !mb-[-18px]">
            <DialogHeader>
              <DialogTitle className="text-white md:!text-[2rem] sm:!text-[1.5rem]">
                미리보기
              </DialogTitle>
            </DialogHeader>
            <DialogClose asChild>
              <X className="text-white size-5 cursor-pointer" />
            </DialogClose>
          </div>
          {screenshotUrl && (
            <Image
              src={screenshotUrl}
              alt="스크린샷"
              width={1200}
              height={1000}
              className="w-full h-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </DndProvider>
  );
}
