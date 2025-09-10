import { TFTRankTier } from '@/types/api';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getQueryParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export const tierKoreanNameMap: {
  [key: string]: { koName: string; imageUrl: string };
} = {
  Challenger: {
    koName: '챌린저',
    imageUrl: '/tier/challenger.png',
  },
  Grandmaster: {
    koName: '그랜드마스터',
    imageUrl: '/tier/grandmaster.png',
  },
  Master: {
    koName: '마스터',
    imageUrl: '/tier/master.png',
  },
  Diamond: {
    koName: '다이아몬드',
    imageUrl: '/tier/diamond.png',
  },
  Emerald: {
    koName: '에메랄드',
    imageUrl: '/tier/emerald.png',
  },
  Platinum: {
    koName: '플래티넘',
    imageUrl: '/tier/platinum.png',
  },
  Gold: {
    koName: '골드',
    imageUrl: '/tier/gold.png',
  },
  Silver: {
    koName: '실버',
    imageUrl: '/tier/silver.png',
  },
  Bronze: {
    koName: '브론즈',
    imageUrl: '/tier/bronze.png',
  },
  Iron: {
    koName: '아이언',
    imageUrl: '/tier/iron.png',
  },
};

export const TFTRankTierEnumReverseMap = {
  [TFTRankTier.CHALLENGER.toString()]: TFTRankTier.CHALLENGER,
  [TFTRankTier.GRANDMASTER.toString()]: TFTRankTier.GRANDMASTER,
  [TFTRankTier.MASTER.toString()]: TFTRankTier.MASTER,
  [TFTRankTier.DIAMOND.toString()]: TFTRankTier.DIAMOND,
  [TFTRankTier.EMERALD.toString()]: TFTRankTier.EMERALD,
  [TFTRankTier.PLATINUM.toString()]: TFTRankTier.PLATINUM,
  [TFTRankTier.GOLD.toString()]: TFTRankTier.GOLD,
  [TFTRankTier.SILVER.toString()]: TFTRankTier.SILVER,
  [TFTRankTier.BRONZE.toString()]: TFTRankTier.BRONZE,
  [TFTRankTier.IRON.toString()]: TFTRankTier.IRON,
};
