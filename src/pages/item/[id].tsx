import { initServerMock } from '@/mocks/server';
import { DetailItemResponse, TFTItemResponse } from '@/types/api';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import HeaderInfoSection from '@/components/common/HeaderInfoSection';
import { FirstInfoSection, MainSection } from '@/styles/style.common';
import { css } from '@emotion/react';
import ItemDisplayContainer from '@/components/common/ItemDisplayContainer';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import TFTMetaPanel from '@/components/common/TFTMetaPanel';
import { sampleTFTMetaData } from '@/data/sampleData';
import { fetchItemsFromBackend } from '@/lib/api';

export const getStaticPaths = (async () => {
  initServerMock();

  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/item`);
  // if (!res.ok) throw new Error('Server Error during get items data');
  // const items: TFTItemResponse = await res.json();
  const items = await fetchItemsFromBackend();
  const paths = items.map((item) => ({
    params: { id: item.id.toString() },
  }));

  return { paths, fallback: false };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  initServerMock();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}/api/v1/items/${params?.id}`,
    );

    if (!res.ok) {
      return { notFound: true };
    }

    const detailItemInfo: DetailItemResponse = await res.json();
    return { props: { detailItemInfo } };
  } catch (error) {
    console.error('Error fetching item detail:', error);
    return { notFound: true };
  }
}) satisfies GetStaticProps;
export default function ItemDetailPage({
  detailItemInfo: { data: detailItem },
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: compositionImgSrc } = useQuery<string[]>({
    queryKey: [detailItem.id, 'item', 'composition'],
    queryFn: async () => {
      const compositionImgSrc: string[] = [];
      for (const composition of detailItem.composition) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_SERVER}/item/api/${composition}`,
        );
        if (!res.ok) throw new Error('Failed to Fetch Item By Names');
        const { data }: DetailItemResponse = await res.json();
        compositionImgSrc.push(data.icon);
      }

      return compositionImgSrc;
    },
  });

  return (
    <>
      <HeaderInfoSection
        title="아이템"
        description="아이템별 능력치와 추천 덱 등을 확인해보세요!"
      />
      <MainSection>
        <FirstInfoSection>
          <ItemDisplayContainer />
          <div className="flex-1">
            <div className="flex gap-2 items-center !mb-2">
              <Image
                src={detailItem.icon}
                alt={detailItem.name}
                width={90}
                height={90}
                className="rounded-full overflow-hidden"
              />
              <div>
                <p className="!text-4xl text-white !mb-2">{detailItem.name}</p>
              </div>
            </div>
            <div
              css={css`
                background-color: var(--bg-theme4);
                padding: 1rem;
                width: 100%;
                border-radius: 0.25rem;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
              `}
            >
              <p className="text-white !text-2xl">조합</p>
              <div className="flex">
                {compositionImgSrc?.map((src, idx) => (
                  <>
                    <Image
                      key={idx}
                      src={src}
                      alt={detailItem.name + ' composition'}
                      width={30}
                      height={30}
                    />
                    {idx !== compositionImgSrc.length - 1 && (
                      <Plus className="text-[#06F1D2]" />
                    )}
                  </>
                ))}
              </div>
              <p className="text-white !text-2xl">효과</p>
              {detailItem.description}
            </div>
          </div>
        </FirstInfoSection>
        <p className="w-[110%] !text-white font-bold !mt-16">
          {detailItem.name} 포함 덱
        </p>
        <hr className="w-[110%] !text-[#333333] !mt-4" />
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
