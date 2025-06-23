import styles from './builder.module.css';
import { CirclePlus, RefreshCw, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchChampionsS14Data, fetchItemS14Data } from '@/lib/supabase';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import ChampionSelectBoard from '@/components/ChampionSelectBoard';
import ItemSelectBoard from '@/components/ItemSelectBoard';
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { useChampionAndIndexStore, useTraitsStateStore } from '@/store';
import SynergyInfo from '@/components/builder/SynergyInfo';
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
  const champions = await fetchChampionsS14Data();
  const items = await fetchItemS14Data();
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

  const onClickCaptureButton = async () => {
    const captureElement = document.getElementById('capture-area');
    if (!captureElement) return;

    const dataUrl = await htmlToImage.toSvg(captureElement, {
      cacheBust: false,
      backgroundColor: '#1a1a1a',
      // pixelRatio: 2,
    });

    setScreenshotUrl(dataUrl);
  };

  return (
    <DndProvider options={HTML5toTouch}>
      <Dialog>
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
                  onClick={onClickCaptureButton}
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
            <div className={styles.builderBoardContainerWrapper}>
              <div className={styles.builderBoardContainer}>
                {Array.from({ length: 28 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`${styles.hexagonWrapper}${
                      Math.floor(idx / 7) % 2 === 1 ? ' ' + styles.offset : ''
                    }`}
                  >
                    <DroppableChampionBoard
                      X={Math.floor(idx / 7)}
                      Y={idx % 7}
                    />
                  </div>
                ))}
              </div>
            </div>
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
          className="bg-[#2a2929] !max-w-[800px]"
          showCloseButton={false}
        >
          <div className="flex justify-between items-center !p-4 w-full !mb-[-18px]">
            <DialogHeader>
              <DialogTitle className="text-white !text-[2rem]">
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
            />
          )}
        </DialogContent>
      </Dialog>
    </DndProvider>
  );
}
