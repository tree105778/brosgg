import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { RankingApiResponse, TFTRankTier } from '@/types/api';
import styles from './rank.module.css';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Challenger from '@/../public/tier/challenger.png';
import Grandmaster from '@/../public/tier/grandmaster.png';
import Master from '@/../public/tier/master.png';
import Diamond from '@/../public/tier/diamond.png';
import Emerald from '@/../public/tier/emerald.png';
import Platinum from '@/../public/tier/platinum.png';
import Gold from '@/../public/tier/gold.png';
import Silver from '@/../public/tier/silver.png';
import Bronze from '@/../public/tier/bronze.png';
import Iron from '@/../public/tier/iron.png';
import Image from 'next/image';
import { fetchRankedTftRankingInfo, fetchRankedTftTop3User } from '@/lib/api';
import Top3LeaderBoard from '@/components/rank/Top3LeaderBoard';
import RankingLeaderBoard from '@/components/rank/RankingLeaderBoard';
import { useRouter } from 'next/router';
import { getQueryParam, TFTRankTierEnumReverseMap } from '@/lib/utils';

export const PAGE_PER_CONTENT = 25;

export const getServerSideProps = (async () => {
  const queryClient = new QueryClient();
  const { data } = await queryClient.fetchQuery<RankingApiResponse>({
    queryKey: ['ranking', TFTRankTier.CHALLENGER.toString(), 1],
    queryFn: () =>
      fetchRankedTftRankingInfo(
        0,
        PAGE_PER_CONTENT,
        true,
        TFTRankTier.CHALLENGER.toString().toUpperCase(),
      ),
  });

  await queryClient.prefetchQuery({
    queryKey: ['ranking', TFTRankTier.CHALLENGER, 'top3user'],
    queryFn: fetchRankedTftTop3User,
  });

  return {
    props: {
      totalCount: data.totalCount || 500,
      dehydrateState: dehydrate(queryClient),
    },
  };
}) satisfies GetServerSideProps;

export default function Rank({
  totalCount,
  dehydrateState,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const totalPage = Math.ceil(totalCount / PAGE_PER_CONTENT);
  const router = useRouter();
  const region = getQueryParam(router.query.region) || 'KR';
  const tier =
    TFTRankTierEnumReverseMap[
      getQueryParam(router.query.tier) || TFTRankTier.CHALLENGER.toString()
    ];

  return (
    <>
      <div className={styles.rankInfoHeaderSection}>
        <h1>랭킹</h1>
        <p>오늘의 TOP 플레이어는 누구?</p>
      </div>
      <div className={styles.rankMainSection}>
        <div className={styles.rankSelectFilterSection}>
          <Select
            defaultValue={region}
            onValueChange={(v) => {
              void router.push({
                query: { ...router.query, region: v, page: 1 },
              });
            }}
          >
            <SelectTrigger className="w-[165px] border-none text-[#C0C4C6] focus-visible:ring-transparent rounded-sm bg-[#2A2929]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="p-4">
              <SelectItem value="KR">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path fill="#FFF" d="M0 3h24v18H0z"></path>
                    <path
                      fill="#C70000"
                      d="M16.102 12c0 2.289-1.838 4.149-4.106 4.149-2.269-.001-4.099-1.857-4.099-4.15 0-2.29 1.837-4.15 4.106-4.15S16.102 9.713 16.102 12"
                    ></path>
                    <path
                      fill="#3D5897"
                      d="M7.953 11.269c.132 1.046.319 2.209 1.928 2.329.6.037 1.773-.143 2.175-1.785.531-1.575 2.119-2.029 3.201-1.174.619.401.788 1.039.829 1.519-.049 1.526-.93 2.853-2.059 3.446-1.301.772-3.097.788-4.668-.383-.709-.662-1.702-1.892-1.406-3.952"
                    ></path>
                    <g fill="#000">
                      <path d="m2.952 8.062 2.326-2.826.544.448L3.497 8.51zM3.8 8.76l2.325-2.826.545.448-2.326 2.826zM4.648 9.457 6.974 6.63l.544.448-2.326 2.827z"></path>
                    </g>
                    <g fill="#000">
                      <path d="m18.176 5.683.544-.448 1.047 1.272-.545.448zM19.454 7.242 20 6.794l1.046 1.27-.545.449zM16.48 7.08l.545-.448 1.046 1.272-.544.448zM17.764 8.636l.545-.448 1.046 1.27-.545.449zM17.33 6.383l.544-.448L20.2 8.761l-.545.448z"></path>
                    </g>
                    <g fill="#000">
                      <path d="m17.331 17.615 1.046-1.27.545.447-1.046 1.271zM18.61 16.058l1.046-1.27.544.447-1.046 1.271zM16.484 16.918l1.046-1.271.545.448-1.046 1.27zM17.761 15.361l1.046-1.27.545.447-1.046 1.271zM18.18 18.311l1.045-1.27.544.447-1.045 1.271zM19.457 16.757l1.046-1.272.545.448L20 17.205z"></path>
                    </g>
                    <g fill="#000">
                      <path d="m4.647 14.543.545-.448 2.326 2.826-.545.448zM3.803 15.24l.545-.449 1.046 1.271-.545.448zM5.08 16.792l.545-.448 1.046 1.271-.545.448zM2.953 15.938l.545-.448 2.326 2.826-.545.448z"></path>
                    </g>
                  </g>
                </svg>
                KR
              </SelectItem>
              <SelectItem value="EU">EU</SelectItem>
            </SelectContent>
          </Select>
          <Select
            defaultValue={tier.toString()}
            onValueChange={(value) =>
              router.push({ query: { ...router.query, tier: value, page: 1 } })
            }
          >
            <SelectTrigger className="w-[165px] border-none text-[#C0C4C6] focus-visible:ring-transparent rounded-sm bg-[#2A2929]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={TFTRankTier.CHALLENGER}>
                <Image
                  src={Challenger}
                  alt={TFTRankTier.CHALLENGER.toString()}
                  width={36}
                  height={36}
                />
                Challenger
              </SelectItem>
              <SelectItem value={TFTRankTier.GRANDMASTER}>
                <Image
                  src={Grandmaster}
                  alt={TFTRankTier.GRANDMASTER.toString()}
                  width={36}
                  height={36}
                />
                Grandmaster
              </SelectItem>
              <SelectItem value={TFTRankTier.MASTER}>
                <Image
                  src={Master}
                  alt={TFTRankTier.MASTER.toString()}
                  width={36}
                  height={36}
                />
                Master
              </SelectItem>
              <SelectItem value={TFTRankTier.DIAMOND}>
                <Image
                  src={Diamond}
                  alt={TFTRankTier.DIAMOND.toString()}
                  width={36}
                  height={36}
                />
                Diamond
              </SelectItem>
              <SelectItem value={TFTRankTier.EMERALD}>
                <Image
                  src={Emerald}
                  alt={TFTRankTier.EMERALD.toString()}
                  width={36}
                  height={36}
                />
                Emerald
              </SelectItem>
              <SelectItem value={TFTRankTier.PLATINUM}>
                <Image
                  src={Platinum}
                  alt={TFTRankTier.PLATINUM.toString()}
                  width={36}
                  height={36}
                />
                Platinum
              </SelectItem>
              <SelectItem value={TFTRankTier.GOLD}>
                <Image
                  src={Gold}
                  alt={TFTRankTier.GOLD.toString()}
                  width={36}
                  height={36}
                />
                Gold
              </SelectItem>
              <SelectItem value={TFTRankTier.SILVER}>
                <Image
                  src={Silver}
                  alt={TFTRankTier.SILVER.toString()}
                  width={36}
                  height={36}
                />
                Silver
              </SelectItem>
              <SelectItem value={TFTRankTier.BRONZE}>
                <Image
                  src={Bronze}
                  alt={TFTRankTier.BRONZE.toString()}
                  width={36}
                  height={36}
                />
                Bronze
              </SelectItem>
              <SelectItem value={TFTRankTier.IRON}>
                <Image
                  src={Iron}
                  alt={TFTRankTier.IRON.toString()}
                  width={36}
                  height={36}
                />
                Iron
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <HydrationBoundary state={dehydrateState}>
          <Top3LeaderBoard region={region} tier={tier} />
          <RankingLeaderBoard tier={tier} totalPage={totalPage} />
        </HydrationBoundary>
      </div>
    </>
  );
}
