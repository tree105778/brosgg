import { create } from 'zustand';
import type { ChampionIndexInfo, TraitsState, TraitsStateStore } from './types';
import { immer } from 'zustand/middleware/immer';

export const useChampionAndIndexStore = create<ChampionIndexInfo>()(
  immer((set) => ({
    championAndIndex: {},
    setChampionIndex: (x, y, champion) =>
      set((state) => {
        state.championAndIndex[`${x},${y}`] = champion;
      }),
    removeChampionIndex: (x, y) =>
      set((state) => {
        const key = `${x},${y}`;
        if (!(key in state.championAndIndex)) return;
        delete state.championAndIndex[key];
      }),
    resetAllChampionIndex: () =>
      set({
        championAndIndex: {},
      }),
  })),
);

const initialTraitsState: TraitsState = {
  droppedItems: [],
  traits: [],
};

export const useTraitsStateStore = create<TraitsStateStore>((set) => ({
  ...initialTraitsState,
  addTraitsState: (champion) =>
    set((state) => {
      const newTraits = [...state.traits];
      if (!state.droppedItems.includes(champion.name)) {
        champion.traits.forEach((trait) => {
          const existingTraits = newTraits.find((t) => t.trait === trait);
          if (existingTraits) existingTraits.count += 1;
          else newTraits.push({ trait, count: 1 });
        });
      }
      newTraits.sort((a, b) => b.count - a.count);
      return {
        ...state,
        droppedItems: [...state.droppedItems, champion.name],
        traits: newTraits,
      };
    }),
  removeTraitsState: (champion) =>
    set((state) => {
      const { droppedItems, traits } = state;
      const newDroppedItems = [...droppedItems];
      const newTraits = [...traits];
      const firstIndex = newDroppedItems.findIndex(
        (item) => item === champion.name,
      );
      if (firstIndex !== -1) {
        newDroppedItems.splice(firstIndex, 1);
      }
      if (!newDroppedItems.includes(champion.name)) {
        champion.traits.forEach((trait) => {
          const existingIndex = newTraits.findIndex((t) => t.trait === trait);
          if (existingIndex === -1) return;
          if (newTraits[existingIndex].count > 1) {
            newTraits[existingIndex].count -= 1;
          } else newTraits.splice(existingIndex, 1);
        });
      }
      newTraits.sort((a, b) => b.count - a.count);
      return {
        ...state,
        droppedItems: newDroppedItems,
        traits: newTraits,
      };
    }),
  removeAllTraitsState: () =>
    set({
      ...initialTraitsState,
    }),
}));
