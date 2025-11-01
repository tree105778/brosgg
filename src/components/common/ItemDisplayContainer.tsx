import { useQuery } from '@tanstack/react-query';
import { TFTItemResponse } from '@/types/api';
import { ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';
import { Search } from 'lucide-react';
import { css } from '@emotion/react';
import Image from 'next/image';

const Container = styled.div`
  width: 315px;
  background-color: #222222;
  color: var(--text-theme1);
  padding: 1rem;
  height: 590px;
  overflow: auto;
`;

const SearchInputContainer = styled.div`
  background-color: #1a1a1a;
  display: flex;
  width: 100%;
  gap: 0.5rem;
  align-items: stretch;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #272727;
`;

const ItemSearchInput = styled.input`
  flex: 1;
  border: none;
  color: white;
  outline: none;
`;

const ItemWrapperContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  overflow: auto;
  width: 100%;
`;

const ItemWrapper = styled.div`
  width: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function ItemDisplayContainer() {
  const { data: items } = useQuery<TFTItemResponse>({
    queryKey: ['item', 'list'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/item`);
      return res.json();
    },
  });
  const [itemText, setItemText] = useState('');
  const [activateItemFilter, setActivateItemFilter] = useState('일반');
  const handleOnChangeItemText = (e: ChangeEvent<HTMLInputElement>) => {
    setItemText(e.target.value);
  };

  return (
    <Container>
      <SearchInputContainer>
        <Search />
        <ItemSearchInput
          placeholder="아이템 검색"
          type="text"
          value={itemText}
          onChange={handleOnChangeItemText}
        />
      </SearchInputContainer>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          gap: 0.25rem;
          margin: 1rem 0;
        `}
      >
        {['일반', '상징', '유물', '찬란', '지원', '엑소테크'].map(
          (val, idx) => (
            <div
              key={idx}
              className={`rounded-sm text-center !py-2 !px-6 ${activateItemFilter === val ? 'bg-[#06F1D2] text-black' : 'bg-[#2A2929]'}`}
              onClick={() => setActivateItemFilter(val)}
            >
              {val}
            </div>
          ),
        )}
      </div>
      <ItemWrapperContainer>
        {items?.data?.map((item) => (
          <ItemWrapper key={item.id}>
            <Image src={item.icon} alt={item.name} width={60} height={60} />
          </ItemWrapper>
        ))}
      </ItemWrapperContainer>
    </Container>
  );
}
