import type { Champion, Item } from '@/types';
import { ItemType } from '@/types';
import items from '@/data/items.json';
import itemRecipes from '@/data/itemRecipes.json';

export const isItemDroppable = (champion: Champion) => {
  if ((champion.item?.length || 0) < 3) return true;
  if (champion.item && champion.item.length === 3) {
    return !!champion.item.find((item) => item.type == ItemType.BASE);
  }
  return false;
};

export function itemCombineProcess(champion: Champion, item: Item) {
  if (!itemRecipes || !items) return;
  if (champion.item) {
    const idx = champion.item.findIndex(
      (it) => it.type === ItemType.BASE || it.type === ItemType.SPECIAL,
    );
    if (
      idx !== -1 &&
      (item.type === ItemType.BASE || item.type === ItemType.SPECIAL)
    ) {
      const max_id =
        champion.item[idx].id >= item.id ? champion.item[idx].id : item.id;
      const min_id =
        champion.item[idx].id < item.id ? champion.item[idx].id : item.id;
      const find_result_recipes = itemRecipes.find(
        (recp) =>
          recp.component_item_id_1 === min_id &&
          recp.component_item_id_2 === max_id,
      );
      if (find_result_recipes == undefined) return champion.item;
      const find_combine_items = items.find(
        (item) => item.id === find_result_recipes.result_item_id,
      );
      if (find_combine_items === undefined) return champion.item;
      const { effects, ...result_items } = {
        ...find_combine_items,
        type: find_combine_items.type as ItemType,
      };
      const newItems = [...champion.item];
      newItems[idx] = result_items;
      return newItems;
    }
    if (champion.item.length === 3) return champion.item;
  }
  return [...(champion.item || []), item];
}
