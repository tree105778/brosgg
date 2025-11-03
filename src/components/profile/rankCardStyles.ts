import styled from '@emotion/styled';

export const RankCard = styled.div`
  background-color: var(--bg-theme3);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: 100%;
`;

export const QueueTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  color: #1db59f;
  margin: 0;
  align-self: flex-start;
`;

export const TierBadge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

export const TierInfo = styled.div`
  text-align: center;
`;

export const TierText = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
  margin: 0;
`;

export const RankDetails = styled.p`
  font-size: 0.875rem;
  color: #999999;
  margin: 0;
  margin-top: 0.25rem;
`;

export const StatsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 0.5rem;
`;

export const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StatLabel = styled.span`
  font-size: 0.875rem;
  color: #999999;
`;

export const StatValue = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
`;

export const UnrankedText = styled.p`
  font-size: 1rem;
  color: #999999;
  margin: 1rem 0;
`;
