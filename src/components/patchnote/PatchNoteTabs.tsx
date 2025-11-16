import { css } from '@emotion/react';
import styled from '@emotion/styled';

const TabsContainer = styled.div`
  width: 80%;
  margin: 2rem auto 0;
  display: flex;
  gap: 2rem;
  border-bottom: 2px solid var(--bg-theme3);
  background-color: transparent;
`;

const Tab = styled.button<{ isActive: boolean }>`
  background: transparent;
  border: none;
  padding: 1rem 0;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  color: ${(props) =>
    props.isActive ? 'var(--text-theme2)' : 'var(--text-theme1)'};
  transition: color 0.2s ease;

  &:hover {
    color: var(--text-theme2);
  }

  ${(props) =>
    props.isActive &&
    css`
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 3px;
        background-color: var(--text-theme2);
      }
    `}
`;

export type TabKey = '시스템' | '챔피언' | '시너지' | '아이템' | '증강제';

const tabs: { label: TabKey }[] = [
  { label: '시스템' },
  { label: '챔피언' },
  { label: '시너지' },
  { label: '아이템' },
  { label: '증강제' },
];

interface PatchNoteTabsProps {
  selectedTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export default function PatchNoteTabs({
  selectedTab,
  onTabChange,
}: PatchNoteTabsProps) {
  return (
    <TabsContainer>
      {tabs.map((tab) => (
        <Tab
          key={tab.label}
          isActive={selectedTab === tab.label}
          onClick={() => onTabChange(tab.label)}
        >
          {tab.label}
        </Tab>
      ))}
    </TabsContainer>
  );
}
