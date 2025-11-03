import Image from 'next/image';
import { QueueRank, getTierImage, formatTier } from './rankCardUtils';
import {
  RankCard,
  QueueTitle,
  TierBadge,
  TierInfo,
  TierText,
  StatsGrid,
  StatRow,
  StatLabel,
  StatValue,
  UnrankedText,
} from './rankCardStyles';

interface TurboCardProps {
  rank?: QueueRank;
}

export default function TurboCard({ rank }: TurboCardProps) {
  return (
    <RankCard>
      <QueueTitle>초고속</QueueTitle>
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
                {formatTier(rank.tier, rank.division)}{' '}
                {rank.lp.toLocaleString()} 점
              </TierText>
            </TierInfo>
          </TierBadge>
        </>
      ) : (
        <UnrankedText>Unranked</UnrankedText>
      )}
    </RankCard>
  );
}
