export enum TFTRankTier {
  IRON = 'Iron',
  BRONZE = 'Bronze',
  SILVER = 'Silver',
  GOLD = 'Gold',
  PLATINUM = 'Platinum',
  EMERALD = 'Emerald',
  DIAMOND = 'Diamond',
  MASTER = 'Master',
  GRANDMASTER = 'Grandmaster',
  CHALLENGER = 'Challenger',
}

type TFTRankDivision = 'I' | 'II' | 'III' | 'IV' | 'V';

interface RankingApiUser {
  puuid: string;
  name: string;
  tag: string;
  tier: TFTRankTier;
  division: TFTRankDivision;
  lp: number;
  top4: number;
  games: number;
}

export interface RankingApiResponse {
  success: boolean;
  err?: {
    msg: string;
    code: string;
  };
  data: {
    list: RankingApiUser[];
    rankingUpdatedTs: number;
    totalCount?: number;
  };
}

interface Summoner {
  _id: string;
  name: string;
  tag: string;
  level: number;
  platform: string;
  region: string;
  updatedTs: number;
  updating: boolean;
  profileIconUrl: string;
}

interface TierRank {
  lp: number;
  tier: string;
  division: TFTRankDivision;
  games: number;
  top1: number;
  top4: number;
  placementSum: number;
}

interface TierDoubleUpOrTurbo {
  tier: string;
  division: TFTRankDivision;
  tierTurbo: string | null;
  lp: number;
}

interface Stats {
  id: string;
  game: number;
  placementSum: number;
}

interface RecentStats {
  placementStats: {
    games: number;
    count: {
      '1': number;
      '2': number;
      '3': number;
      '4': number;
      '5': number;
      '6': number;
      '7': number;
      '8': number;
    };
  };
  championStats: Stats[];
  traitStats: Stats[];
}

export interface SummonerDetailApiResponse {
  success: boolean;
  err?: {
    msg: string;
    code: string;
  };
  data: {
    summoner: Summoner;
    tierRank: TierRank;
    tierDoubleUp: TierDoubleUpOrTurbo;
    tierTurbo: TierDoubleUpOrTurbo;
    recentStats: RecentStats;
    tierGraph: {
      tier: string;
      division: string;
      tierTurbo: string | null;
      lp: number;
      date: string;
    }[];
  };
}

export interface ChampionListResponse {
  id: number;
  championId: string;
  name: string;
  cost: number;
  role: string;
  season: number;
  active: boolean;
  ts: number; // timestamp (ms)
  traits: string[];
  images: {
    square: string;
  };
}

export interface ChampionDetailResponse {
  id: number;
  championId: string;
  name: string;
  cost: number;
  role: string;
  season: number;
  active: boolean;
  ts: number;
  traits: string[];
  images: {
    square: string;
  };
  stats: {
    range: number;
    attackSpeed: {
      base: number;
    };
    perStar: {
      [star: number]: {
        hp: number;
        ad: number;
        armor: number;
        mr: number;
      };
    };
    derived: {
      dps: {
        [star: number]: number;
      };
    };
    mana: {
      start: number;
      total: number;
    };
  };
  ability: {
    name: string;
    icon: string;
    description: string;
  };
}
