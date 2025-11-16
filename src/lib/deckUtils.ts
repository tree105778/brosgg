import type { DeckUnit } from '@/types/api';
import type { ChampionHexagonContainerProp } from '@/types/prop';
import type { Database } from '@/types/database.types';

type Champion = Database['public']['Tables']['champions_s14']['Row'];

/**
 * DeckUnit을 ChampionHexagonContainerProp으로 변환
 */
export function convertUnitToChampionProp(
  unit: DeckUnit,
  championData?: Champion,
): ChampionHexagonContainerProp {
  const resolvedName =
    unit.championName ?? unit.name ?? championData?.name ?? unit.championId;

  const resolvedCost =
    unit.championCost ?? unit.cost ?? championData?.cost ?? 1;

  return {
    cost: resolvedCost,
    name: resolvedName,
    image: unit.imageUrl,
    items: unit.itemDetails.map((item) => ({
      itemName: item.name,
      itemImgSrc: item.iconUrl,
      itemApiName: item.apiName,
    })),
    tier: unit.starLevel,
    championId: unit.championId,
  };
}

/**
 * Synergies JSON 문자열을 Traits 배열로 변환
 */
export function parseSynergies(
  synergiesJson: string | null,
): { trait: string; count: number }[] {
  if (!synergiesJson) return [];

  try {
    const parsed = JSON.parse(synergiesJson) as Record<string, number>;
    return Object.entries(parsed)
      .map(([trait, count]) => ({ trait, count }))
      .sort((a, b) => b.count - a.count);
  } catch {
    return [];
  }
}
