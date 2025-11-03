import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, RotateCcw } from 'lucide-react';
import { css } from '@emotion/react';

interface MetaFiltersProps {
  selectedTier: string | null;
  onTierChange: (tier: string | null) => void;
  selectedRank: string;
  onRankChange: (rank: string) => void;
  selectedSortBy: string;
  onSortByChange: (sortBy: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onReset: () => void;
}

export default function MetaFilters({
  selectedTier,
  onTierChange,
  selectedRank,
  onRankChange,
  selectedSortBy,
  onSortByChange,
  searchQuery,
  onSearchChange,
  onReset,
}: MetaFiltersProps) {
  const tiers = ['S', 'A', 'B', 'C', 'D'];

  return (
    <div
      css={css`
        background-color: var(--bg-theme4);
        padding: 1.5rem;
        border-radius: 0.5rem;
        margin: 0 auto 2rem;
        width: 100%;
      `}
    >
      <div className="flex flex-col gap-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="챔피언 검색"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-[#1a1a1a] border-gray-700 text-white"
          />
        </div>

        {/* Tier Filter Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold mr-2">티어:</span>
          {tiers.map((tier) => (
            <Button
              key={tier}
              variant={selectedTier === tier ? 'default' : 'outline'}
              size="sm"
              onClick={() => onTierChange(selectedTier === tier ? null : tier)}
              css={css`
                ${selectedTier === tier &&
                `
                  background-color: var(--text-theme2);
                  color: black;
                  font-weight: bold;
                `}
              `}
            >
              {tier}
            </Button>
          ))}
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">랭크:</span>
            <Select value={selectedRank} onValueChange={onRankChange}>
              <SelectTrigger className="w-[140px] bg-[#1a1a1a] border-gray-700 text-white">
                <SelectValue placeholder="랭크 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 랭크</SelectItem>
                <SelectItem value="diamond+">Diamond+</SelectItem>
                <SelectItem value="master+">Master+</SelectItem>
                <SelectItem value="grandmaster+">Grandmaster+</SelectItem>
                <SelectItem value="challenger">Challenger</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">정렬:</span>
            <Select value={selectedSortBy} onValueChange={onSortByChange}>
              <SelectTrigger className="w-[140px] bg-[#1a1a1a] border-gray-700 text-white">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tier">티어</SelectItem>
                <SelectItem value="winRate">승방률</SelectItem>
                <SelectItem value="pickRate">픽률</SelectItem>
                <SelectItem value="avgPlacement">평균 순위</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="ml-auto"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            필터 초기화
          </Button>
        </div>
      </div>
    </div>
  );
}
