import { RankingApiResponse, TFTRankTier } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import { fetchRankedTftRankingInfo } from '@/lib/api';
import { PAGE_PER_CONTENT } from '@/pages/rank';
import styles from '@/pages/rank.module.css';
import Image from 'next/image';
import { getQueryParam, tierKoreanNameMap } from '@/lib/utils';
import { useRouter } from 'next/router';

export const PAGE_COUNT = 10;

export default function RankingLeaderBoard({
  tier,
  totalPage,
}: {
  tier: TFTRankTier | string;
  totalPage: number;
}) {
  const router = useRouter();
  const page = Number(getQueryParam(router.query.page)) || 1;
  const index = Math.floor((page - 1) / PAGE_COUNT);
  const { data: rankingList } = useQuery<RankingApiResponse>({
    queryKey: ['ranking', tier.toString(), page],
    queryFn: () =>
      fetchRankedTftRankingInfo(
        (page - 1) * PAGE_PER_CONTENT,
        PAGE_PER_CONTENT,
        page === 1,
        tier.toString().toUpperCase(),
      ),
  });

  return (
    <div className="text-white w-full">
      <div className={styles.rankingHeaderSection}>
        <div className="min-w-[4rem] text-center">순위</div>
        <div className="flex-[1]">소환사명</div>
        <div className="min-w-[7rem] text-center">티어</div>
        <div className="min-w-[7rem] text-center">LP</div>
        <div className="min-w-[5rem] text-center">승률</div>
        <div className="min-w-[5rem] text-center">순방률</div>
        <div className="min-w-[5rem] text-center">게임수</div>
      </div>
      <div className={styles.rankingListSection}>
        {rankingList?.data.list.map((list, idx) => (
          <>
            <div
              key={idx + PAGE_PER_CONTENT * (page - 1)}
              className="flex items-center gap-8 !p-4"
            >
              <div className="min-w-[4rem] text-center">
                {idx + PAGE_PER_CONTENT * (page - 1) + 1}
              </div>
              <div className="flex-[1]">
                {list.name}#{list.tag}
              </div>
              <div className="flex items-center gap-2 min-w-[7rem]">
                <Image
                  src={tierKoreanNameMap[tier.toString()].imageUrl}
                  alt={tier.toString()}
                  width={36}
                  height={36}
                />
                {tierKoreanNameMap[tier.toString()].koName}
              </div>
              <div className="min-w-[7rem] text-center">{list.lp} LP</div>
              <div className="min-w-[5rem] text-center">
                {((list.top4 / list.games) * 100).toFixed(1)}%
              </div>
              <div className="min-w-[5rem] text-center">
                {((list.top4 / list.games) * 100).toFixed(1)}%
              </div>
              <div className="min-w-[5rem] text-center">{list.games}</div>
            </div>
            <hr />
          </>
        ))}
      </div>
      <div className={styles.paginationSection}>
        <button
          className={styles.paginationButton}
          disabled={index === 0}
          onClick={() => {
            void router.push({
              query: {
                ...router.query,
                page: (index - 1) * PAGE_COUNT + PAGE_COUNT,
              },
            });
          }}
        >
          &lt;
        </button>
        {Array.from({
          length:
            totalPage - index * PAGE_COUNT < PAGE_COUNT
              ? totalPage - index * PAGE_COUNT
              : PAGE_COUNT,
        }).map((_, idx) => (
          <button
            key={index * PAGE_COUNT + idx + 1}
            className={`${page === index * PAGE_COUNT + idx + 1 ? 'bg-[#00F0D1] text-white !p-2' : styles.paginationButton}`}
            onClick={() =>
              router.push({
                query: { ...router.query, page: index * PAGE_COUNT + idx + 1 },
              })
            }
          >
            {index * PAGE_COUNT + idx + 1}
          </button>
        ))}
        <button
          className={styles.paginationButton}
          disabled={(index + 1) * PAGE_COUNT >= totalPage}
          onClick={() => {
            void router.push({
              query: { ...router.query, page: (index + 1) * PAGE_COUNT + 1 },
            });
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
