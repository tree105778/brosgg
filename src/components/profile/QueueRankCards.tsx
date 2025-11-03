import styled from '@emotion/styled';
import RankedCard from './RankedCard';
import DoubleUpCard from './DoubleUpCard';
import TurboCard from './TurboCard';
import { QueueRank } from './rankCardUtils';

interface QueueRankCardsProps {
  rankedRank?: QueueRank;
  doubleUpRank?: QueueRank;
  turboRank?: QueueRank;
}

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  margin-top: 1.5rem;
`;

export default function QueueRankCards({
  rankedRank,
  doubleUpRank,
  turboRank,
}: QueueRankCardsProps) {
  return (
    <CardsContainer>
      <RankedCard rank={rankedRank} />
      <DoubleUpCard rank={doubleUpRank} />
      <TurboCard rank={turboRank} />
    </CardsContainer>
  );
}
