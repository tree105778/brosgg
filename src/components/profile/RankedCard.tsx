import Image from 'next/image';
import {
  QueueRank,
  getTierImage,
  formatTier,
  formatRankPercentage,
} from './rankCardUtils';
import {
  RankCard,
  QueueTitle,
  TierBadge,
  TierInfo,
  TierText,
  RankDetails,
  StatsGrid,
  StatRow,
  StatLabel,
  StatValue,
  UnrankedText,
} from './rankCardStyles';

interface RankedCardProps {
  rank?: QueueRank;
}

export default function RankedCard({ rank }: RankedCardProps) {
  return (
    <RankCard>
      <QueueTitle>랭크 게임</QueueTitle>
      {rank ? (
        <>
          <TierBadge>
            <Image
              src={getTierImage(rank.tier)}
              alt={rank.tier}
              width={80}
              height={80}
            />
            <TierInfo>
              <TierText>
                {formatTier(rank.tier, rank.division)} {rank.lp}LP
              </TierText>
              {formatRankPercentage(rank.tier, rank.lp) && (
                <RankDetails>
                  {formatRankPercentage(rank.tier, rank.lp)}
                  {rank.tier === 'CHALLENGER' && ' | 1위'}
                </RankDetails>
              )}
            </TierInfo>
          </TierBadge>
          <StatsGrid>
            {rank.games !== undefined && (
              <StatRow>
                <StatLabel>게임 수</StatLabel>
                <StatValue>{rank.games}</StatValue>
              </StatRow>
            )}
            {rank.averagePlacement !== undefined && (
              <StatRow>
                <StatLabel>평균 등수</StatLabel>
                <StatValue>{rank.averagePlacement.toFixed(1)}</StatValue>
              </StatRow>
            )}
            {rank.top4Count !== undefined && (
              <StatRow>
                <StatLabel>순방 횟수</StatLabel>
                <StatValue>{rank.top4Count}</StatValue>
              </StatRow>
            )}
            {rank.wins !== undefined && (
              <StatRow>
                <StatLabel>우승</StatLabel>
                <StatValue>{rank.wins}</StatValue>
              </StatRow>
            )}
          </StatsGrid>
        </>
      ) : (
        <UnrankedText>Unranked</UnrankedText>
      )}
    </RankCard>
  );
}
