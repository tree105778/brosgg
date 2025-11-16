import { ChampionDetailResponse, ChampionListResponse } from '@/types/api';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { initServerMock } from '@/mocks/server';
import HeaderInfoSection from '@/components/common/HeaderInfoSection';
import ChampionDisplayContainer from '@/components/common/ChampionDisplayContainer';
import styled from '@emotion/styled';
import Image from 'next/image';
import { css } from '@emotion/react';
import { useState } from 'react';
import RecommendItemContainer from '@/components/common/RecommendItemContainer';
import { sampleRecommendItemData, sampleTFTMetaData } from '@/data/sampleData';
import TFTMetaPanel from '@/components/common/TFTMetaPanel';
import { FirstInfoSection, MainSection } from '@/styles/style.common';

export const getStaticPaths = (async () => {
  initServerMock();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/api/v1/champions`,
  );
  if (!res.ok) throw new Error('Server Error during get champions data');
  const champs: ChampionListResponse[] = await res.json();
  const paths = champs.map((champ) => ({
    params: { id: champ.id.toString() },
  }));

  return { paths, fallback: false };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  initServerMock();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}/api/v1/champions/${params?.id}`,
    );

    if (!res.ok) {
      return { notFound: true };
    }

    const detailChampionInfo: ChampionDetailResponse = await res.json();
    return { props: { detailChampionInfo } };
  } catch (error) {
    console.error('Error fetching champion detail:', error);
    return { notFound: true };
  }
}) satisfies GetStaticProps;

const ActiveTab = styled.button<{ active?: boolean }>`
  font-weight: bold;
  height: 2rem;
  color: ${({ active }) => (active ? '#06F1D2' : 'white')};
  border-bottom: ${({ active }) => active && '1px solid var(--text-theme2)'};
`;

const ChampionStarTab = styled.button<{ active?: boolean }>`
  margin-top: 1rem;
  min-width: 2rem;
  padding: 0.5rem;
  height: 2rem;
  background-color: ${({ active }) => (active ? '#1C4B45' : '#333333')};
  border: ${({ active }) => active && '1px solid #1DB59F'};
  border-radius: 8px;
`;

export default function ChampionDetailPage({
  detailChampionInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [activeTab, setActiveTab] = useState('stat');
  const [championStar, setChampionStar] = useState(1);

  return (
    <>
      <HeaderInfoSection
        title={'챔피언'}
        description={'챔피언별 능력치와 추천 덱 등을 확인해보세요!'}
      />
      <MainSection>
        <FirstInfoSection>
          <ChampionDisplayContainer />
          <div className="flex-1">
            <div className="flex gap-2 items-center !mb-2">
              <Image
                src={detailChampionInfo.images.square}
                alt={detailChampionInfo.name}
                width={90}
                height={90}
                className="rounded-full overflow-hidden"
              />
              <div>
                <p className="!text-4xl text-white !mb-2">
                  {detailChampionInfo.name}
                </p>
                <div className="flex gap-2 items-center">
                  {detailChampionInfo.traits.map((trait, idx) => (
                    <div
                      key={idx}
                      css={css`
                        background-color: var(--bg-theme1);
                        display: flex;
                        padding: 0.5rem;
                        border: 1px solid #2d2d2d;
                        color: white;
                      `}
                    >
                      {trait}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              css={css`
                background-color: var(--bg-theme4);
                padding: 1rem;
                width: 100%;
                border-radius: 0.25rem;
              `}
            >
              <div className="flex gap-4">
                <ActiveTab
                  active={activeTab === 'stat'}
                  onClick={() => setActiveTab('stat')}
                >
                  기본 능력치
                </ActiveTab>
                <ActiveTab
                  active={activeTab === 'skill'}
                  onClick={() => setActiveTab('skill')}
                >
                  스킬 정보
                </ActiveTab>
              </div>
              {activeTab === 'stat' && (
                <div>
                  <div className="flex gap-4">
                    <ChampionStarTab
                      active={championStar === 1}
                      onClick={() => setChampionStar(1)}
                    >
                      ★
                    </ChampionStarTab>
                    <ChampionStarTab
                      active={championStar === 2}
                      onClick={() => setChampionStar(2)}
                    >
                      ★★
                    </ChampionStarTab>
                    <ChampionStarTab
                      active={championStar === 3}
                      onClick={() => setChampionStar(3)}
                    >
                      ★★★
                    </ChampionStarTab>
                  </div>
                  <div className="flex gap-x-[100px] gap-y-[1rem] lg:gap-x-[100px] md:gap-x-[50px] sm:gap-x-[30px] flex-wrap !mt-4">
                    <div className="min-w-[70px]">
                      <p className="text-[#999999]">체력</p>
                      <p className="!text-2xl text-white">
                        {detailChampionInfo.stats.perStar[championStar].hp}
                      </p>
                    </div>
                    <div className="min-w-[70px]">
                      <p className="text-[#999999]">공격력</p>
                      <p className="!text-2xl text-white">
                        {detailChampionInfo.stats.perStar[championStar].ad}
                      </p>
                    </div>
                    <div className="min-w-[70px]">
                      <p className="text-[#999999]">DPS</p>
                      <p className="!text-2xl text-white">
                        {detailChampionInfo.stats.derived.dps[championStar]}
                      </p>
                    </div>
                    <div className="min-w-[70px]">
                      <p className="text-[#999999]">공격사거리</p>
                      <p className="!text-2xl text-white">
                        {detailChampionInfo.stats.range}
                      </p>
                    </div>
                    <div className="min-w-[70px]">
                      <p className="text-[#999999]">공격속도</p>
                      <p className="!text-2xl text-white">
                        {detailChampionInfo.stats.attackSpeed.base}
                      </p>
                    </div>
                    <div className="min-w-[70px]">
                      <p className="text-[#999999]">방어력</p>
                      <p className="!text-2xl text-white">
                        {detailChampionInfo.stats.perStar[championStar].armor}
                      </p>
                    </div>
                    <div className="min-w-[70px]">
                      <p className="text-[#999999]">마법저항력</p>
                      <p className="!text-2xl text-white">
                        {detailChampionInfo.stats.perStar[championStar].mr}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'skill' && (
                <div className="flex flex-col gap-2 !mt-2">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={detailChampionInfo.ability.icon}
                      alt={detailChampionInfo.ability.name}
                      width={55}
                      height={55}
                    />
                    <div>
                      <p className="text-white">
                        {detailChampionInfo.ability.name}
                      </p>
                      <p className="text-[#207AC7] !text-[0.9rem] !mt-1">
                        마나 | {detailChampionInfo.stats.mana.start}/
                        {detailChampionInfo.stats.mana.total}
                      </p>
                    </div>
                  </div>
                  <p className="text-white">
                    {detailChampionInfo.ability.description}
                  </p>
                  <div
                    css={css`
                      background-color: #2a2a2a;
                      padding: 1rem;
                      color: #999999;
                      display: flex;
                      flex-direction: column;
                      gap: 10px;
                    `}
                  >
                    <p>피해량</p>
                    <p>충전 시 피해량</p>
                  </div>
                </div>
              )}
            </div>
            <div
              css={css`
                background-color: var(--bg-theme4);
                padding: 1.5rem 1rem;
                margin-top: 2rem;
                border-radius: 0.25rem;
              `}
            >
              <p
                css={css`
                  color: white;
                  font-size: 1.25rem;
                `}
              >
                추천 아이템
              </p>
              <hr className="text-[#2E2E2E] mt-4" />
              <RecommendItemContainer
                recommendItems={sampleRecommendItemData}
              />
              <RecommendItemContainer
                recommendItems={sampleRecommendItemData}
              />
              <RecommendItemContainer
                recommendItems={sampleRecommendItemData}
              />
              <RecommendItemContainer
                recommendItems={sampleRecommendItemData}
              />
              <RecommendItemContainer
                recommendItems={sampleRecommendItemData}
              />
            </div>
          </div>
        </FirstInfoSection>
        <p className="w-[110%] !text-white font-bold !mt-16">
          {detailChampionInfo.name} 포함 덱
        </p>
        <hr className="w-[110%] !text-[#333333] mt-4" />
        <TFTMetaPanel metaPanel={sampleTFTMetaData} />
        <TFTMetaPanel metaPanel={sampleTFTMetaData} />
        <TFTMetaPanel metaPanel={sampleTFTMetaData} />
        <TFTMetaPanel metaPanel={sampleTFTMetaData} />
        <TFTMetaPanel metaPanel={sampleTFTMetaData} />
        <TFTMetaPanel metaPanel={sampleTFTMetaData} />
      </MainSection>
    </>
  );
}
