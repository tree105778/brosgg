type BasicItem = {
  itemName: string;
  itemImgSrc: string;
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
  }[];
}

export interface TFTMetaPanelProp extends DefaultNumberStat {
  metaTier: string;
  metaName: string;
  champs: ChampionHexagonContainerProp[];
  pickRate: number;
}
