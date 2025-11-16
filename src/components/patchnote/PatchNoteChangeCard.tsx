import styled from '@emotion/styled';
import { PatchNoteItem, ChangeType } from '@/types/api';

const CardContainer = styled.div`
  background-color: var(--bg-theme3);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemName = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

const TraitsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const TraitBadge = styled.span`
  background-color: var(--bg-theme4);
  color: var(--text-theme1);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const TraitIcon = styled.span`
  font-size: 0.75rem;
`;

const ChangesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ChangeItem = styled.div<{ changeType: ChangeType }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => {
    if (props.changeType === 'nerf') return '#ff6b6b';
    if (props.changeType === 'buff') return '#51cf66';
    return 'var(--text-theme1)';
  }};
  font-size: 0.95rem;
`;

const ChangeIcon = styled.span<{ changeType: ChangeType }>`
  font-size: 1rem;
  color: ${(props) => {
    if (props.changeType === 'nerf') return '#ff6b6b';
    if (props.changeType === 'buff') return '#51cf66';
    return 'var(--text-theme1)';
  }};
`;

interface PatchNoteChangeCardProps {
  item: PatchNoteItem;
}

export default function PatchNoteChangeCard({
  item,
}: PatchNoteChangeCardProps) {
  const getChangeIcon = (type: ChangeType): string => {
    if (type === 'nerf') return '▼';
    if (type === 'buff') return '▲';
    return '•';
  };

  return (
    <CardContainer>
      <HeaderSection>
        {item.imageUrl && <ItemImage src={item.imageUrl} alt={item.name} />}
        <ItemInfo>
          <ItemName>{item.name}</ItemName>
          {item.traits && item.traits.length > 0 && (
            <TraitsContainer>
              {item.traits.map((trait, index) => (
                <TraitBadge key={index}>
                  <TraitIcon>◆</TraitIcon>
                  {trait}
                </TraitBadge>
              ))}
            </TraitsContainer>
          )}
        </ItemInfo>
      </HeaderSection>
      <ChangesSection>
        {item.changes.map((change, index) => (
          <ChangeItem key={index} changeType={change.type}>
            <ChangeIcon changeType={change.type}>
              {getChangeIcon(change.type)}
            </ChangeIcon>
            {change.label}
          </ChangeItem>
        ))}
      </ChangesSection>
    </CardContainer>
  );
}
