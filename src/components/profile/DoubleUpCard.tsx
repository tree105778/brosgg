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

interface DoubleUpCardProps {
  rank?: QueueRank;
}

export default function DoubleUpCard({ rank }: DoubleUpCardProps) {
  return (
    <RankCard>
      <QueueTitle>더블 업</QueueTitle>
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
                </RankDetails>
              )}
            </TierInfo>
          </TierBadge>
        </>
      ) : (
        <UnrankedText>Unranked</UnrankedText>
      )}
    </RankCard>
  );
}
