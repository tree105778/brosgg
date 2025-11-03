import styled from '@emotion/styled';
import { TierGraphPoint } from '@/types/api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface TierGraphProps {
  tierGraph: TierGraphPoint[];
  currentLP?: number;
}

const GraphContainer = styled.div`
  background-color: var(--bg-theme3);
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--text-theme2);
  margin-bottom: 2rem;
`;

const GraphContent = styled.div`
  width: 100%;
  height: 250px;
  margin: 1rem auto;
`;

const TooltipContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  border: 1px solid #1db59f;
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
`;

const TooltipLabel = styled.div`
  font-size: 0.75rem;
  color: #999999;
  margin-bottom: 0.25rem;
`;

const TooltipValue = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  color: #1db59f;
`;

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <TooltipLabel>{payload[0].payload.date}</TooltipLabel>
        <TooltipValue>{payload[0].value} LP</TooltipValue>
      </TooltipContainer>
    );
  }
  return null;
};

export default function TierGraph({
  tierGraph,
  currentLP = 0,
}: TierGraphProps) {
  if (!tierGraph || tierGraph.length === 0) {
    return null;
  }

  // Calculate LP gain/loss based on placement
  const getLPChange = (placement: number): number => {
    const lpChanges: Record<number, number> = {
      1: 40,
      2: 30,
      3: 20,
      4: 10,
      5: -10,
      6: -20,
      7: -30,
      8: -40,
    };
    return lpChanges[placement] || 0;
  };

  // Calculate historical LP values working backwards from current LP
  const lpHistory: Array<{ lp: number; timestamp: number; matchId: string }> =
    [];
  let calculatedLP = currentLP;

  // Reverse to go from newest to oldest
  const reversedGraph = [...tierGraph].reverse();

  for (const point of reversedGraph) {
    lpHistory.unshift({
      lp: calculatedLP,
      timestamp: point.gameDatetime,
      matchId: point.matchId,
    });
    // Subtract the LP change to get previous LP
    calculatedLP -= getLPChange(point.placement);
  }

  // Group by date (day) and get the last LP value for each day
  const dailyData = new Map<string, { lp: number; timestamp: number }>();

  lpHistory.forEach((point) => {
    const date = new Date(point.timestamp);
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    // Keep the last LP value for each day
    if (
      !dailyData.has(dateKey) ||
      point.timestamp > dailyData.get(dateKey)!.timestamp
    ) {
      dailyData.set(dateKey, { lp: point.lp, timestamp: point.timestamp });
    }
  });

  // Convert to array and sort by date - only show days with actual games
  const dailyDataArray = Array.from(dailyData.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([dateKey, data]) => {
      const [year, month, day] = dateKey.split('-');
      return {
        date: `${month}/${day}`,
        lp: data.lp,
        timestamp: data.timestamp,
      };
    });

  const lpValues = dailyDataArray.map((point) => point.lp);
  const maxLP = Math.max(...lpValues);
  const minLP = Math.min(...lpValues);

  // Calculate domain with padding - handles various tier ranges
  const lpRange = maxLP - minLP || 100;
  const padding = Math.max(lpRange * 0.15, 50); // At least 50 LP padding
  const yMin = Math.max(0, Math.floor(minLP - padding));
  const yMax = Math.ceil(maxLP + padding);

  return (
    <GraphContainer>
      <Title>티어 그래프</Title>
      <GraphContent>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dailyDataArray}
            // margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
            margin={{ right: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="date"
              stroke="#999999"
              style={{ fontSize: '0.75rem' }}
              interval="preserveStartEnd"
              minTickGap={30}
            />
            <YAxis
              stroke="#999999"
              style={{ fontSize: '0.75rem' }}
              domain={[yMin, yMax]}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="linear"
              dataKey="lp"
              stroke="#1db59f"
              strokeWidth={2}
              dot={{
                fill: '#06F1D2',
                r: 5,
                strokeWidth: 2,
                stroke: 'transparent',
              }}
              activeDot={{ r: 7, strokeWidth: 2 }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </GraphContent>
    </GraphContainer>
  );
}
