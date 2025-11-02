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

export interface TFTItem {
  id: number;
  apiName: string;
  gameVersion: string;
  name: string;
  description: string;
  icon: string;
  unique: boolean;
  associatedTraits: string[];
  composition: string[];
  effects: Record<string, number>; // 예: { AD: 10.0 } 또는 { CritDamage: 25.0 }
  incompatibleTraits: string[];
  tags: string[];
  active: boolean;
}

interface BasicInterface {
  success: boolean;
  err: string | null;
}

export interface TFTItemResponse extends BasicInterface {
  data: TFTItem[];
}

export interface DetailItemResponse extends BasicInterface {
  data: TFTItem;
}

// Summoner Match History Types
export interface MatchUnit {
  championId: string;
  championName: string;
  tier: number;
  items: string[];
}

export interface MatchInfo {
  matchId: string;
  queueType: '전체' | '개인 랭크' | '일반' | '더블 업' | '초고속 모드';
  placement: number;
  gameLength: number;
  playedAt: string;
  units: MatchUnit[];
  traits: {
    name: string;
    tier: number;
    count: number;
  }[];
  lpChange?: number;
}

export interface SummonerMatchHistoryResponse extends BasicInterface {
  data: {
    matches: MatchInfo[];
    totalCount: number;
  };
}

// Summoner Profile Types
export interface SummonerProfileStats {
  games: number;
  avgPlacement: number;
  top4Rate: number;
  wins: number;
}

export interface ChampionStat {
  championId: string;
  championName: string;
  games: number;
  avgPlacement: number;
  wins: number;
  pickRate: number;
}

export interface SynergyStat {
  traitName: string;
  games: number;
  avgPlacement: number;
  wins: number;
  pickRate: number;
}

export interface TierGraphPoint {
  tier: string;
  division: string;
  lp: number;
  date: string;
}

export interface SummonerProfileResponse extends BasicInterface {
  data: {
    summoner: {
      name: string;
      tag: string;
      profileIconUrl: string;
      level: number;
    };
    tier: {
      tier: string;
      division: string;
      lp: number;
    };
    stats: SummonerProfileStats;
    championStats: ChampionStat[];
    synergyStats: SynergyStat[];
    tierGraph: TierGraphPoint[];
  };
}

// Deck/Meta types (based on API documentation)
export interface ItemDetail {
  apiName: string;
  name: string;
  iconUrl: string;
  composition: string[];
  effects: Record<string, number>;
}

export interface DeckUnit {
  unitId: number;
  championId: string;
  starLevel: number;
  items: string[];
  itemDetails: ItemDetail[];
  imageUrl: string;
  position: {
    row: number;
    col: number;
  };
}

export interface DeckBoard {
  boardId: number | null;
  level: number;
  synergies: string | null; // JSON string
  units: DeckUnit[];
}

// Deck summary response (list endpoint)
export interface DeckSummary {
  deckId: number;
  title: string;
  userId: number;
  setVersion: number;
  description: string;
  totalUnits: number;
  maxLevel: number;
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
  createdAt: string;
  updatedAt: string;
  activate: boolean;
  // Extended for meta display (not in original API but needed for UI)
  avgPlacement?: number;
  top4Rate?: number;
  firstRate?: number;
  pickRate?: number;
}

// Deck detail response (single deck endpoint)
export interface DeckDetail {
  deckId: number;
  title: string;
  userId: number;
  setVersion: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  activate: boolean;
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
  boards: DeckBoard[];
}

export interface DeckListResponse extends BasicInterface {
  data: DeckSummary[];
}

export interface DeckDetailResponse extends BasicInterface {
  data: DeckDetail;
}

// Extended response for meta page (includes champions from boards)
export interface MetaDeckSummary extends DeckSummary {
  champions: {
    championId: string;
    name: string;
    cost: number;
    imageUrl: string;
    items: ItemDetail[];
  }[];
  synergies: {
    name: string;
    count: number;
  }[];
}

export interface MetaDeckListResponse extends BasicInterface {
  data: MetaDeckSummary[];
}
