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

// Summoner API Types (based on API documentation)

// Common types
export interface EntityUsage {
  apiName: string;
  displayName: string;
  count: number;
}

// Client-side extended type for champion stats with calculated average placement
export interface EntityUsageWithPlacement extends EntityUsage {
  averagePlacement: number;
}

export interface TraitReference {
  apiName: string;
  displayName: string;
}

export interface TraitDetail {
  apiName: string;
  displayName: string;
  tierCurrent: number;
  tierTotal: number;
  numUnits: number;
  style: number;
}

export interface SummonerItemDetail {
  apiName: string;
  displayName: string;
  iconUrl: string;
}

export interface UnitDetail {
  apiName: string;
  displayName: string;
  tier: number;
  characterId: string;
  cost: number;
  traits: TraitReference[];
  iconUrl: string;
  items: SummonerItemDetail[];
}

// Tier graph point
export interface TierGraphPoint {
  matchId: string;
  gameDatetime: number;
  placement: number;
}

// Rank information
export interface Rank {
  queue: string;
  tier: string;
  division: string;
  lp: number;
  wins: number;
  losses: number;
  tierGraph: TierGraphPoint[];
}

// Summoner basic info
export interface SummonerInfo {
  puuid: string;
  gameName: string;
  tagLine: string;
  summonerLevel: number | null;
  profileIconId: number | null;
  rank: Rank | null;
  rankDoubleUp?: Rank | null;
  rankTurbo?: Rank | null;
}

// Summary statistics
export interface SummaryStats {
  matchCount: number;
  averagePlacement: number;
  top4Rate: number;
  winRate: number;
  placementDistribution: number[];
  mostPlayedTraits: EntityUsage[];
  mostPlayedUnits: EntityUsage[];
}

// Match summary
export interface MatchSummary {
  matchId: string;
  gameDatetime: number;
  placement: number;
  queueType: string;
  augments: string[];
  traits: TraitDetail[];
  units: UnitDetail[];
}

// Match player detail
export interface MatchPlayer {
  placement: number;
  puuid: string | null;
  gameName: string;
  tagLine: string;
  level: number;
  lastRound: string;
  augments: string[];
  traits: TraitDetail[];
  units: UnitDetail[];
  goldLeft: number;
  damageDealt: number;
}

// Match detail (8 players)
export interface MatchDetail {
  matchId: string;
  gameDatetime: number;
  gameDurationSeconds: number;
  queueType: string;
  players: MatchPlayer[];
}

// Main response
export interface SummonerDetailResponse extends BasicInterface {
  data: {
    summoner: SummonerInfo;
    summaryStats: SummaryStats;
    matches: MatchSummary[];
    matchDetails: MatchDetail[];
    fetchedAt: number;
  };
}

// Updating status response
export interface SummonerUpdatingResponse extends BasicInterface {
  data: {
    puuid: string;
    updating: boolean;
    lastUpdatedAt: number | null;
    lastRequestedAt: number;
    message: string | null;
    lastError: string | null;
  };
}

// Deck/Meta types (based on API documentation)
export interface DeckItemDetail {
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
  itemDetails: DeckItemDetail[];
  imageUrl: string;
  name?: string;
  championName?: string;
  cost?: number;
  championCost?: number;
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
  todayPick?: boolean;
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
  todayPick?: boolean;
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
    items: DeckItemDetail[];
  }[];
  synergies: {
    name: string;
    count: number;
  }[];
}

export interface MetaDeckListResponse extends BasicInterface {
  data: MetaDeckSummary[];
}

// PatchNote types (based on patchnote-api-docs.md)
export interface PatchNoteSummary {
  id: string;
  season: number;
  version: string;
  title: string;
  active: boolean;
  releaseTs: string; // ISO-8601 timestamp
}

export interface PatchNoteDetail {
  id: string;
  season: number;
  version: string;
  title: string;
  content: string; // Will be parsed as JSON for tabs
  active: boolean;
  releaseTs: string; // ISO-8601 timestamp
}

export interface PatchNoteListResponse extends BasicInterface {
  data: PatchNoteSummary[];
}

export interface PatchNoteDetailResponse extends BasicInterface {
  data: PatchNoteDetail;
}

// UI-specific types for parsed patch note content
export type ChangeType = 'nerf' | 'buff' | 'neutral';

export interface PatchNoteChange {
  label: string; // e.g., "체력: 200 ⇒ 150"
  type: ChangeType;
}

export interface PatchNoteItem {
  name: string; // e.g., "니달리", "무한의 대검"
  imageUrl?: string;
  traits?: string[]; // For champions: ["니토로", "흉폭한"]
  changes: PatchNoteChange[];
}

export interface PatchNoteTabContent {
  시스템: PatchNoteItem[];
  챔피언: PatchNoteItem[];
  시너지: PatchNoteItem[];
  아이템: PatchNoteItem[];
  증강제: PatchNoteItem[];
}
