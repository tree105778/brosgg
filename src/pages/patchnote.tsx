import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import HeaderInfoSection from '@/components/common/HeaderInfoSection';
import PatchNoteDetailCard from '@/components/patchnote/PatchNoteDetailCard';
import PatchNoteTabs, { TabKey } from '@/components/patchnote/PatchNoteTabs';
import PatchNoteChangeCard from '@/components/patchnote/PatchNoteChangeCard';
import PatchHistoryDialog from '@/components/patchnote/PatchHistoryDialog';
import { fetchPatchNotes, fetchPatchNoteDetail } from '@/lib/api';
import {
  PatchNoteTabContent,
  PatchNoteSummary,
  PatchNoteDetail,
} from '@/types/api';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: var(--bg-theme1);
`;

const ContentSection = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 2rem 0;

  @media (max-width: 1024px) {
    width: 90%;
    padding: 1.5rem 0;
  }

  @media (max-width: 640px) {
    width: 95%;
    padding: 1rem 0;
  }
`;

const TabContentSection = styled.div`
  width: 80%;
  margin: 2rem auto;
  padding: 2rem 0;

  @media (max-width: 1024px) {
    width: 90%;
    margin: 1.5rem auto;
    padding: 1.5rem 0;
  }

  @media (max-width: 640px) {
    width: 95%;
    margin: 1rem auto;
    padding: 1rem 0;
  }
`;

const SectionTitle = styled.h2`
  color: var(--text-theme2);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
`;

const ChangesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: var(--text-theme1);
  font-size: 1.2rem;
  padding: 4rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #ff6b6b;
  font-size: 1.2rem;
  padding: 4rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: var(--text-theme1);
  font-size: 1rem;
  padding: 2rem;
`;

export default function PatchNotePage() {
  const [selectedTab, setSelectedTab] = useState<TabKey>('시스템');
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [selectedPatchId, setSelectedPatchId] = useState<string | null>(null);

  // Fetch all patch notes (active only)
  const {
    data: patchNotesData,
    isLoading: isLoadingList,
    error: listError,
  } = useQuery({
    queryKey: ['patchNotes', 'active'],
    queryFn: () => fetchPatchNotes({ active: true }),
  });

  // Get the latest patch note ID or selected one
  const currentPatchId = useMemo(() => {
    if (selectedPatchId) return selectedPatchId;
    if (patchNotesData?.data && patchNotesData.data.length > 0) {
      // Sort by releaseTs descending to get the latest
      const sorted = [...patchNotesData.data].sort(
        (a, b) =>
          new Date(b.releaseTs).getTime() - new Date(a.releaseTs).getTime(),
      );
      return sorted[0].id;
    }
    return null;
  }, [patchNotesData, selectedPatchId]);

  // Fetch the current patch note detail
  const {
    data: patchNoteDetailData,
    isLoading: isLoadingDetail,
    error: detailError,
  } = useQuery({
    queryKey: ['patchNoteDetail', currentPatchId],
    queryFn: () => fetchPatchNoteDetail(currentPatchId!),
    enabled: !!currentPatchId,
  });

  // Parse the content JSON
  const parsedContent = useMemo<PatchNoteTabContent | null>(() => {
    if (!patchNoteDetailData?.data?.content) return null;
    try {
      return JSON.parse(patchNoteDetailData.data.content);
    } catch (error) {
      console.error('Failed to parse patch note content:', error);
      return null;
    }
  }, [patchNoteDetailData]);

  // Get current tab content
  const currentTabItems = useMemo(() => {
    if (!parsedContent) return [];
    return parsedContent[selectedTab] || [];
  }, [parsedContent, selectedTab]);

  const handleSelectPatch = (patchNote: PatchNoteSummary) => {
    setSelectedPatchId(patchNote.id);
  };

  if (isLoadingList || isLoadingDetail) {
    return (
      <PageContainer>
        <HeaderInfoSection
          title="패치노트"
          description="패치 노트를 보고 다음 메타를 예측해보세요!"
        />
        <LoadingMessage>패치노트를 불러오는 중...</LoadingMessage>
      </PageContainer>
    );
  }

  if (listError || detailError) {
    return (
      <PageContainer>
        <HeaderInfoSection
          title="패치노트"
          description="패치 노트를 보고 다음 메타를 예측해보세요!"
        />
        <ErrorMessage>패치노트를 불러오는 중 오류가 발생했습니다.</ErrorMessage>
      </PageContainer>
    );
  }

  if (!patchNoteDetailData?.data) {
    return (
      <PageContainer>
        <HeaderInfoSection
          title="패치노트"
          description="패치 노트를 보고 다음 메타를 예측해보세요!"
        />
        <EmptyMessage>표시할 패치노트가 없습니다.</EmptyMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <HeaderInfoSection
        title="패치노트"
        description="패치 노트를 보고 다음 메타를 예측해보세요!"
      />

      <ContentSection>
        <PatchNoteDetailCard
          patchNote={patchNoteDetailData.data}
          onHistoryClick={() => setHistoryDialogOpen(true)}
        />
      </ContentSection>

      <PatchNoteTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />

      <TabContentSection>
        <SectionTitle>{selectedTab} 변경사항</SectionTitle>
        {currentTabItems.length === 0 ? (
          <EmptyMessage>이 카테고리에는 변경사항이 없습니다.</EmptyMessage>
        ) : (
          <ChangesGrid>
            {currentTabItems.map((item, index) => (
              <PatchNoteChangeCard key={index} item={item} />
            ))}
          </ChangesGrid>
        )}
      </TabContentSection>

      <PatchHistoryDialog
        open={historyDialogOpen}
        onOpenChange={setHistoryDialogOpen}
        patchNotes={patchNotesData?.data || []}
        currentPatchId={currentPatchId || undefined}
        onSelectPatch={handleSelectPatch}
      />
    </PageContainer>
  );
}
