import { useQuery } from '@tanstack/react-query';
import { fetchRankedTftTop3UserForTier } from '@/lib/api';
import styles from '@/pages/rank.module.css';
import Image from 'next/image';
import { RefreshCw } from 'lucide-react';
import { TFTRankTier } from '@/types/api';

const rankColorMap: { [key: number]: string } = {
  1: '#00F0D1',
  2: '#FEB93C',
  3: '#8CA1AD',
};

export default function Top3LeaderBoard({
  region,
  tier,
}: {
  region: string;
  tier: TFTRankTier | string;
}) {
  const {
    data: top3User,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['ranking', tier, 'top3user'],
    queryFn: () => fetchRankedTftTop3UserForTier(tier),
  });

  return (
    <div className={styles.top3LeaderBoardSection}>
      <p className="!text-2xl">
        <span className="text-[#00F0D1]">KR</span> TOP 플레이어
      </p>
      <div className={styles.top3UserLeaderBoard}>
        {top3User?.map((user) => (
          <div key={user.rank} className={`${styles.top3UserEachContainer}`}>
            <Image
              src={user.profileImg}
              alt={user.name + user.tag}
              loading="eager"
              className="rounded-tl-2xl"
              fill
            />
            <div
              className={`w-8 h-10 absolute right-0 top-0 flex items-center justify-center !text-2xl font-bold`}
              style={{
                backgroundColor: rankColorMap[user.rank],
              }}
            >
              {user.rank}
            </div>
            <div
              className="w-full h-8 absolute bottom-0 flex gap-4"
              style={{
                backgroundColor: rankColorMap[user.rank],
              }}
            >
              <div
                className="bg-[#2C2C2C] flex justify-center items-center w-14 h-9 relative bottom-2 !text-2xl font-bold rounded-lg"
                style={{
                  color: rankColorMap[user.rank],
                }}
              >
                {region}
              </div>
              <div className="font-bold flex items-center">
                {user.name}#{user.tag}
              </div>
            </div>
          </div>
        )) ||
          (isFetching ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className={`${styles.top3UserEachContainer} animate-pulse bg-gray-500`}
              />
            ))
          ) : (
            <div className="mx-auto flex items-center gap-2">
              <p>에러가 발생했습니다! 다시 시도해주세요</p>
              <button onClick={() => refetch()}>
                <RefreshCw />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
