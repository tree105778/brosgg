import styled from '@emotion/styled';
import { PatchNoteDetail } from '@/types/api';

const DetailCardContainer = styled.div`
  width: 80%;
  margin: 2rem auto;
  padding: 3rem;
  background-color: var(--bg-theme4);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const VersionTitle = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
`;

const ReleaseDate = styled.p`
  color: var(--text-theme1);
  font-size: 1.1rem;
  margin: 0;
`;

const HistoryButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  border: 2px solid var(--text-theme2);
  border-radius: 8px;
  color: var(--text-theme2);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--text-theme2);
    color: var(--bg-theme4);
  }
`;

interface PatchNoteDetailCardProps {
  patchNote: PatchNoteDetail;
  onHistoryClick: () => void;
}

export default function PatchNoteDetailCard({
  patchNote,
  onHistoryClick,
}: PatchNoteDetailCardProps) {
  // Format release date from ISO-8601 to Korean format
  const formatReleaseDate = (isoString: string): string => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일 업데이트`;
  };

  return (
    <DetailCardContainer>
      <LeftSection>
        <VersionTitle>{patchNote.version} 패치노트</VersionTitle>
        <ReleaseDate>{formatReleaseDate(patchNote.releaseTs)}</ReleaseDate>
      </LeftSection>
      <HistoryButton onClick={onHistoryClick}>패치 히스토리</HistoryButton>
    </DetailCardContainer>
  );
}
