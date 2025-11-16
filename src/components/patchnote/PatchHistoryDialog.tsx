import styled from '@emotion/styled';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { XIcon } from 'lucide-react';
import { PatchNoteSummary } from '@/types/api';

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 500px;
  overflow-y: auto;
  padding: 1rem 0;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--bg-theme3);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--text-theme2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--main-theme);
  }
`;

const HistoryItem = styled.button<{ isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background-color: ${(props) =>
    props.isActive ? 'var(--bg-theme4)' : 'var(--bg-theme3)'};
  border: 2px solid
    ${(props) => (props.isActive ? 'var(--text-theme2)' : 'transparent')};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    border-color: var(--text-theme2);
    background-color: var(--bg-theme4);
  }
`;

const ItemVersion = styled.div`
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
`;

const ItemDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const ItemTitle = styled.div`
  color: var(--text-theme1);
  font-size: 0.95rem;
`;

const ItemDate = styled.div`
  color: var(--text-theme1);
  font-size: 0.85rem;
  white-space: nowrap;
`;

const ActiveBadge = styled.span`
  background-color: var(--text-theme2);
  color: var(--bg-theme4);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const CloseButton = styled(DialogClose)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--bg-theme3);
  border: 2px solid var(--text-theme2);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 1;

  &:hover {
    background-color: var(--text-theme2);
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

interface PatchHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patchNotes: PatchNoteSummary[];
  currentPatchId?: string;
  onSelectPatch: (patchNote: PatchNoteSummary) => void;
}

export default function PatchHistoryDialog({
  open,
  onOpenChange,
  patchNotes,
  currentPatchId,
  onSelectPatch,
}: PatchHistoryDialogProps) {
  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const handlePatchClick = (patchNote: PatchNoteSummary) => {
    onSelectPatch(patchNote);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[600px] bg-[var(--bg-theme4)] !p-4"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-white !text-2xl font-bold">
            패치 버전 선택
          </DialogTitle>
          <CloseButton>
            <XIcon />
            <span className="sr-only">Close</span>
          </CloseButton>
        </DialogHeader>
        <HistoryList>
          {patchNotes.length === 0 ? (
            <div style={{ color: 'var(--text-theme1)', textAlign: 'center' }}>
              패치 노트가 없습니다
            </div>
          ) : (
            patchNotes.map((patchNote) => (
              <HistoryItem
                key={patchNote.id}
                isActive={patchNote.id === currentPatchId}
                onClick={() => handlePatchClick(patchNote)}
              >
                <ItemVersion>
                  {patchNote.version} 패치노트
                  {patchNote.id === currentPatchId && (
                    <>
                      {' '}
                      <ActiveBadge>현재</ActiveBadge>
                    </>
                  )}
                </ItemVersion>
                <ItemDetails>
                  <ItemTitle>{patchNote.title}</ItemTitle>
                  <ItemDate>{formatDate(patchNote.releaseTs)}</ItemDate>
                </ItemDetails>
              </HistoryItem>
            ))
          )}
        </HistoryList>
      </DialogContent>
    </Dialog>
  );
}
