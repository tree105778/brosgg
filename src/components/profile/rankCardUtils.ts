export interface QueueRank {
  queue: string;
  tier: string;
  division: string;
  lp: number;
  wins?: number;
  losses?: number;
  games?: number;
  averagePlacement?: number;
  top4Count?: number;
}

export const getTierImage = (tier: string) => {
  const tierLower = tier.toLowerCase();
  return `https://d18kctlbb86miz.cloudfront.net/ranked-emblems/emblem-${tierLower}.png`;
};

export const formatTier = (tier: string, division: string) => {
  if (tier === 'CHALLENGER' || tier === 'GRANDMASTER' || tier === 'MASTER') {
    return tier.charAt(0) + tier.slice(1).toLowerCase();
  }
  if (tier === 'HYPER') {
    return 'Hyper';
  }
  return `${tier.charAt(0)}${tier.slice(1).toLowerCase()} ${division}`;
};

export const formatRankPercentage = (tier: string, lp: number) => {
  // For high tiers, show approximate percentage (this would come from API ideally)
  if (tier === 'CHALLENGER') {
    return '상위 0.0001%';
  }
  if (tier === 'GRANDMASTER') {
    return '상위 0.001%';
  }
  if (tier === 'MASTER') {
    return '상위 0.1%';
  }
  return '';
};
