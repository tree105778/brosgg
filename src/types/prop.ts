type BasicItem = {
  itemName: string;
  itemImgSrc: string;
  itemApiName?: string; // Optional API name for navigation
};

export interface DefaultNumberStat {
  avgPlacement: number;
  top4Rate: number;
  firstRate: number;
}

export interface RecommendItemContainerProp extends DefaultNumberStat {
  items: BasicItem[];
  gameCount: number;
}

export interface ChampionHexagonContainerProp {
  cost: number;
  name: string;
  image: string;
  items: {
    itemName: string;
    itemImgSrc: string;
    itemApiName?: string; // Optional API name for navigation
  }[];
  tier?: number; // Star level (1-3)
  championId?: string; // Optional champion ID for navigation
  onClick?: () => void; // Optional click handler for navigation
}

export interface TFTMetaPanelProp extends DefaultNumberStat {
  metaTier: string;
  metaName: string;
  champs: ChampionHexagonContainerProp[];
  pickRate: number;
  deckId?: number; // Optional deck ID for navigation
}
