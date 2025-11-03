import styled from '@emotion/styled';
import { SummaryStats } from '@/types/api';

interface StatsCardsProps {
  stats: SummaryStats;
}

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
  margin-top: 1.5rem;
`;

const StatCard = styled.div`
  background-color: var(--bg-theme4);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatLabel = styled.p`
  font-size: 0.875rem;
  color: #999999;
  margin: 0;
`;

const StatValue = styled.p`
  font-size: 1.75rem;
  font-weight: bold;
  color: white;
  margin: 0;
`;

const StatSubValue = styled.span`
  font-size: 1rem;
  color: #999999;
  margin-left: 0.25rem;
`;

export default function StatsCards({ stats }: StatsCardsProps) {
  // Calculate wins (1st place count) from placement distribution
  const wins = stats.placementDistribution[0] || 0;

  return (
    <CardsContainer>
      <StatCard>
        <StatLabel>게임 수</StatLabel>
        <StatValue>{stats.matchCount}</StatValue>
      </StatCard>
      <StatCard>
        <StatLabel>평균 등수</StatLabel>
        <StatValue>{stats.averagePlacement.toFixed(1)}</StatValue>
      </StatCard>
      <StatCard>
        <StatLabel>순방 확률</StatLabel>
        <StatValue>
          {(stats.top4Rate * 100).toFixed(1)}
          <StatSubValue>%</StatSubValue>
        </StatValue>
      </StatCard>
      <StatCard>
        <StatLabel>우승</StatLabel>
        <StatValue>{wins}</StatValue>
      </StatCard>
    </CardsContainer>
  );
}
