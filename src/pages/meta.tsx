import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import HeaderInfoSection from '@/components/common/HeaderInfoSection';
import { MainSection } from '@/styles/style.common';
import MetaFilters from '@/components/meta/MetaFilters';
import TFTMetaPanel from '@/components/common/TFTMetaPanel';
import { MetaDeckListResponse } from '@/types/api';
import { TFTMetaPanelProp } from '@/types/prop';

export default function MetaPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selectedRank, setSelectedRank] = useState('diamond+');
  const [selectedSortBy, setSelectedSortBy] = useState('tier');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, error } = useQuery<MetaDeckListResponse>({
    queryKey: ['decks', selectedTier, selectedRank, selectedSortBy],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedTier) params.append('tier', selectedTier);
      if (selectedRank !== 'all') params.append('rank', selectedRank);
      if (selectedSortBy !== 'tier') params.append('sortBy', selectedSortBy);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}/api/decks?${params.toString()}`,
      );
      if (!res.ok) throw new Error('Failed to fetch decks');
      return res.json();
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
      deckId: deck.deckId,
      champs:
        deck.champions?.map((champ) => ({
          cost: champ.cost,
          name: champ.name,
          image: champ.imageUrl,
          championId: champ.championId,
          items:
            champ.items?.map((item) => ({
              itemName: item.name,
              itemImgSrc: item.iconUrl,
              itemApiName: item.apiName,
            })) || [],
        })) || [],
    })) || [];

  return (
    <>
      <HeaderInfoSection
        title="메타 추천"
        description="현재 시즌의 강력한 덱 조합을 확인하고 나에게 맞는 전략을 찾아보세요!"
      />
      <MainSection>
        <div className="lg:w-[110%] md:w-full sm:w-full">
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
        </div>

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
            <p className="lg:w-[110%] md:w-full sm:w-full text-white font-semibold !mb-2">
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
      </MainSection>
    </>
  );
}
