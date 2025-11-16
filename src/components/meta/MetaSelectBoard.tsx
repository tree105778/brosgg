import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MetaFilters from './MetaFilters';
import TFTMetaPanel from '../common/TFTMetaPanel';
import { fetchMetaDecks } from '@/lib/api';
import { MetaDeckListResponse } from '@/types/api';
import { TFTMetaPanelProp } from '@/types/prop';

export default function MetaSelectBoard() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selectedRank, setSelectedRank] = useState('diamond+');
  const [selectedSortBy, setSelectedSortBy] = useState('tier');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, error } = useQuery<MetaDeckListResponse>({
    queryKey: ['home-meta-decks', selectedTier, selectedRank, selectedSortBy],
    queryFn: async () => {
      const params: { tier?: string; activate?: boolean } = {
        activate: true,
      };
      if (selectedTier) params.tier = selectedTier;

      const response = await fetchMetaDecks(params);
      if (!response.success) {
        throw new Error('Failed to fetch meta decks');
      }
      return response;
    },
  });

  const handleReset = () => {
    setSelectedTier(null);
    setSelectedRank('diamond+');
    setSelectedSortBy('tier');
    setSearchQuery('');
  };

  // Filter decks by search query
  const filteredDecks = data?.data?.filter((deck) => {
    if (!searchQuery) return true;

    const searchLower = searchQuery.toLowerCase();
    const deckNameMatch = deck.title.toLowerCase().includes(searchLower);
    const championMatch = deck.champions?.some((champ) =>
      champ.name.toLowerCase().includes(searchLower),
    );
    const synergyMatch = deck.synergies?.some((synergy) =>
      synergy.name.toLowerCase().includes(searchLower),
    );

    return deckNameMatch || championMatch || synergyMatch;
  });

  // Transform deck data to TFTMetaPanelProp format
  const metaPanels: TFTMetaPanelProp[] =
    filteredDecks?.map((deck) => ({
      metaTier: deck.tier,
      metaName: deck.title,
      avgPlacement: deck.avgPlacement || 0,
      firstRate: deck.firstRate || 0,
      pickRate: deck.pickRate || 0,
      top4Rate: deck.top4Rate || 0,
      champs:
        deck.champions?.map((champ) => ({
          cost: champ.cost,
          name: champ.name,
          image: champ.imageUrl,
          items: champ.items.map((item) => ({
            itemName: item.name,
            itemImgSrc: item.iconUrl,
          })),
        })) || [],
    })) || [];

  return (
    <div className="w-full">
      <MetaFilters
        selectedTier={selectedTier}
        onTierChange={setSelectedTier}
        selectedRank={selectedRank}
        onRankChange={setSelectedRank}
        selectedSortBy={selectedSortBy}
        onSortByChange={setSelectedSortBy}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onReset={handleReset}
      />

      {isLoading && (
        <div className="text-white text-center py-8">
          <p>덱 정보를 불러오는 중...</p>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center py-8">
          <p>덱 정보를 불러오는데 실패했습니다.</p>
        </div>
      )}

      {!isLoading && !error && metaPanels && (
        <>
          <p className="text-white font-semibold !mb-2 !mt-4">
            총 {metaPanels.length}개의 덱
          </p>

          {metaPanels.length === 0 ? (
            <div className="text-gray-400 text-center py-8">
              <p>검색 결과가 없습니다.</p>
            </div>
          ) : (
            <>
              {metaPanels.map((metaPanel, idx) => (
                <TFTMetaPanel key={idx} metaPanel={metaPanel} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}
