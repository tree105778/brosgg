import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { css } from '@emotion/react';
import { useMemo, useState } from 'react';
import { SummonerDetailResponse, EntityUsageWithPlacement } from '@/types/api';
import ProfileHeader from '@/components/profile/ProfileHeader';
import MatchHistory from '@/components/profile/MatchHistory';
import TierGraph from '@/components/profile/TierGraph';
import ChampionStats from '@/components/profile/ChampionStats';
import SynergyStats from '@/components/profile/SynergyStats';
import { initServerMock } from '@/mocks/server';
import RecentStats from '@/components/profile/RecentStats';
import RankedCard from '@/components/profile/RankedCard';
import DoubleUpCard from '@/components/profile/DoubleUpCard';
import TurboCard from '@/components/profile/TurboCard';

export const getServerSideProps = (async (context) => {
  const { user } = context.params as { user: string };

  // Parse user string (format: name-tag)
  const [name, tag] = user.split('-');

  if (!name || !tag) {
    return {
      notFound: true,
    };
  }

  initServerMock();

  const queryClient = new QueryClient();

  try {
    // Prefetch summoner detail (includes everything)
    await queryClient.prefetchQuery({
      queryKey: ['summonerDetail', name, tag],
      queryFn: async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_SERVER}/summoner/detail/${name}/${tag}`,
        );
        if (!res.ok) throw new Error('Failed to fetch summoner detail');
        return res.json() as Promise<SummonerDetailResponse>;
      },
    });

    return {
      props: {
        name,
        tag,
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    console.error('Error fetching summoner data:', error);
    return {
      notFound: true,
    };
  }
}) satisfies GetServerSideProps;

async function fetchSummonerDetail(name: string, tag: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/summoner/detail/${name}/${tag}`,
  );
  if (!res.ok) throw new Error('Failed to fetch summoner detail');
  return res.json() as Promise<SummonerDetailResponse>;
}

export default function ProfilePage({
  name,
  tag,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selectedQueue, setSelectedQueue] = useState<string>('전체');

  const {
    data: summonerData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['summonerDetail', name, tag],
    queryFn: () => fetchSummonerDetail(name, tag),
  });

  const handleRefresh = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}/summoner/refresh/${name}/${tag}`,
        { method: 'POST' },
      );
      if (res.ok) {
        // Refetch the data after successful refresh
        refetch();
      } else {
        console.error('Failed to refresh summoner data');
      }
    } catch (error) {
      console.error('Error refreshing summoner data:', error);
    }
  };

  // Filter matches by queue type
  const filteredMatches = useMemo(() => {
    if (!summonerData?.data?.matches) return [];
    if (selectedQueue === '전체') return summonerData.data.matches;
    return summonerData.data.matches.filter(
      (match) => match.queueType === selectedQueue.toUpperCase(),
    );
  }, [summonerData, selectedQueue]);

  // Calculate champion stats with average placement (recent 20 matches)
  const championStatsWithPlacement = useMemo(() => {
    if (!summonerData?.data) return [];

    const matches = summonerData.data.matches.slice(0, 20);

    if (!matches || matches.length === 0) return [];

    // Calculate average placement for each champion in recent 20 matches
    const championPlacementMap = new Map<
      string,
      { placements: number[]; displayName: string; count: number }
    >();

    matches.forEach((match) => {
      match.units.forEach((unit) => {
        if (!championPlacementMap.has(unit.apiName)) {
          championPlacementMap.set(unit.apiName, {
            placements: [],
            displayName: unit.displayName,
            count: 0,
          });
        }
        const champData = championPlacementMap.get(unit.apiName)!;
        champData.placements.push(match.placement);
        champData.count += 1;
      });
    });

    // Convert to EntityUsageWithPlacement and sort by count
    const result: EntityUsageWithPlacement[] = Array.from(
      championPlacementMap.entries(),
    )
      .map(([apiName, data]) => ({
        apiName,
        displayName: data.displayName,
        count: data.count,
        averagePlacement:
          data.placements.reduce((sum, p) => sum + p, 0) /
          data.placements.length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 most played

    return result;
  }, [summonerData]);

  // Calculate synergy stats with average placement (recent 20 matches)
  const synergyStatsWithPlacement = useMemo(() => {
    if (!summonerData?.data) return [];

    const matches = summonerData.data.matches.slice(0, 20);

    if (!matches || matches.length === 0) return [];

    // Calculate average placement for each synergy/trait in recent 20 matches
    const synergyPlacementMap = new Map<
      string,
      { placements: number[]; displayName: string; count: number }
    >();

    matches.forEach((match) => {
      match.traits.forEach((trait) => {
        if (!synergyPlacementMap.has(trait.apiName)) {
          synergyPlacementMap.set(trait.apiName, {
            placements: [],
            displayName: trait.displayName,
            count: 0,
          });
        }
        const synergyData = synergyPlacementMap.get(trait.apiName)!;
        synergyData.placements.push(match.placement);
        synergyData.count += 1;
      });
    });

    // Convert to EntityUsageWithPlacement and sort by count
    const result: EntityUsageWithPlacement[] = Array.from(
      synergyPlacementMap.entries(),
    )
      .map(([apiName, data]) => ({
        apiName,
        displayName: data.displayName,
        count: data.count,
        averagePlacement:
          data.placements.reduce((sum, p) => sum + p, 0) /
          data.placements.length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 most played

    return result;
  }, [summonerData]);

  if (isLoading) {
    return (
      <div
        css={css`
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          color: var(--text-theme1);
        `}
      >
        <div
          css={css`
            color: white;
            text-align: center;
            padding: 4rem;
            font-size: 1.25rem;
          `}
        >
          로딩 중...
        </div>
      </div>
    );
  }

  if (!summonerData?.success || !summonerData.data) {
    return (
      <div
        css={css`
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          color: var(--text-theme1);
        `}
      >
        <div
          css={css`
            color: white;
            text-align: center;
            padding: 4rem;
            font-size: 1.25rem;
          `}
        >
          소환사를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  const { summoner, summaryStats } = summonerData.data;

  // Use only recent 20 matches
  const recent20Matches = summonerData.data.matches.slice(0, 20);

  // Calculate placementDistribution for recent 20 matches
  const recent20PlacementDistribution = Array(8).fill(0);
  recent20Matches.forEach((match) => {
    if (match.placement >= 1 && match.placement <= 8) {
      recent20PlacementDistribution[match.placement - 1]++;
    }
  });

  // Calculate firstPlaceCount and top4Count from recent 20 matches
  const firstPlaceCount = recent20PlacementDistribution[0] || 0;
  const top4Count = recent20PlacementDistribution
    .slice(0, 4)
    .reduce((sum, count) => sum + count, 0);

  // Calculate average placement for recent 20 matches
  const recent20AveragePlacement =
    recent20Matches.length > 0
      ? recent20Matches.reduce((sum, match) => sum + match.placement, 0) /
        recent20Matches.length
      : summaryStats.averagePlacement;

  return (
    <div
      css={css`
        width: 80%;
        margin: 2rem auto;
        color: var(--text-theme1);
      `}
    >
      <ProfileHeader
        name={summoner?.gameName}
        tag={summoner?.tagLine}
        profileIconUrl={`https://d18kctlbb86miz.cloudfront.net/profileicon/${summoner.profileIconId}.png`}
        onRefresh={handleRefresh}
      />

      <div
        css={css`
          display: grid;
          align-items: stretch;
          width: 100%;
          grid-template-areas: 'ranked recent champion synergy' 'doubleup tier tier tier' 'turbo tier tier tier';
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: 2fr 1fr 1fr;
          gap: 1rem;
          margin-top: 2rem;
        `}
      >
        <div
          css={css`
            grid-area: ranked;
            height: 100%;
          `}
        >
          <RankedCard
            rank={
              summoner.rank
                ? {
                    queue: summoner.rank.queue,
                    tier: summoner.rank.tier,
                    division: summoner.rank.division,
                    lp: summoner.rank.lp,
                    games: recent20Matches.length,
                    wins: firstPlaceCount,
                    losses: summoner.rank.losses,
                    averagePlacement: recent20AveragePlacement,
                    top4Count: top4Count,
                  }
                : undefined
            }
          />
        </div>
        <div
          css={css`
            grid-area: recent;
            height: 100%;
          `}
        >
          <RecentStats
            matchCount={recent20Matches.length}
            averagePlacement={recent20AveragePlacement}
            firstPlaceCount={firstPlaceCount}
            top4Count={top4Count}
            placementDistribution={recent20PlacementDistribution}
          />
        </div>
        <div
          css={css`
            grid-area: champion;
            height: 100%;
          `}
        >
          <ChampionStats championStats={championStatsWithPlacement} />
        </div>
        <div
          css={css`
            grid-area: synergy;
            height: 100%;
          `}
        >
          <SynergyStats synergyStats={synergyStatsWithPlacement} />
        </div>
        <div
          css={css`
            grid-area: doubleup;
            height: 100%;
          `}
        >
          <DoubleUpCard
            rank={
              summoner.rankDoubleUp
                ? {
                    queue: summoner.rankDoubleUp.queue,
                    tier: summoner.rankDoubleUp.tier,
                    division: summoner.rankDoubleUp.division,
                    lp: summoner.rankDoubleUp.lp,
                    games:
                      summoner.rankDoubleUp.wins + summoner.rankDoubleUp.losses,
                    averagePlacement: recent20AveragePlacement,
                  }
                : undefined
            }
          />
        </div>
        <div
          css={css`
            grid-area: turbo;
            height: 100%;
          `}
        >
          <TurboCard
            rank={
              summoner.rankTurbo
                ? {
                    queue: summoner.rankTurbo.queue,
                    tier: summoner.rankTurbo.tier,
                    division: summoner.rankTurbo.division,
                    lp: summoner.rankTurbo.lp,
                    games: summoner.rankTurbo.wins + summoner.rankTurbo.losses,
                    averagePlacement: recent20AveragePlacement,
                  }
                : undefined
            }
          />
        </div>
        <div
          css={css`
            grid-area: tier;
            height: 100%;
          `}
        >
          <TierGraph
            tierGraph={summoner.rank?.tierGraph || []}
            currentLP={summoner.rank?.lp || 0}
          />
        </div>
      </div>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          margin-top: 3rem;
        `}
      >
        <div
          css={css`
            margin-top: 1.5rem;
          `}
        >
          <h2
            css={css`
              font-size: 1.5rem;
              font-weight: bold;
              color: var(--text-theme2);
              margin-bottom: 1rem;
            `}
          >
            매치 히스토리
          </h2>
          <hr className="text-[#333333] mb-1" />
          <div
            css={css`
              display: flex;
              gap: 2rem;
              margin-bottom: 1.5rem;
            `}
          >
            {[
              { label: '전체', value: '전체' },
              { label: '개인 랭크', value: 'RANKED' },
              { label: '일반', value: 'NORMAL' },
              { label: '더블 업', value: 'DOUBLE_UP' },
              { label: '초고속 모드', value: 'TURBO' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedQueue(tab.value)}
                css={css`
                  background: transparent;
                  border: none;
                  color: ${selectedQueue === tab.value
                    ? 'var(--text-theme2)'
                    : 'var(--text-theme1)'};
                  font-size: 1rem;
                  font-weight: 600;
                  padding: 0.75rem 0;
                  cursor: pointer;
                  position: relative;
                  transition: color 0.2s;

                  //&:hover {
                  //  color: var(--main-theme);
                  //}

                  ${selectedQueue === tab.value &&
                  `
                      &::after {
                        content: '';
                        position: absolute;
                        bottom: -2px;
                        left: 0;
                        right: 0;
                        height: 2px;
                        background-color: var(--main-theme);
                      }
                    `}
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {filteredMatches.length > 0 ? (
            <MatchHistory matches={filteredMatches} />
          ) : (
            <div
              css={css`
                color: white;
                padding: 2rem;
                text-align: center;
              `}
            >
              매치 데이터가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
