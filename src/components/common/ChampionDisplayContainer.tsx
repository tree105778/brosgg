import { Search } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { ChampionListResponse } from '@/types/api';
import Image from 'next/image';
import styled from '@emotion/styled';

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

const ChampionSearchInput = styled.input`
  flex: 1;
  border: none;
  color: white;
  outline: none;
`;

const ChampionWrapperContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  overflow: auto;
  width: 100%;
`;

const ChampionWrapper = styled.div`
  width: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export default function ChampionDisplayContainer() {
  const router = useRouter();
  const { data: champs } = useQuery<ChampionListResponse[]>({
    queryKey: ['champion', 'list'],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}/api/v1/champions`,
      );
      return await res.json();
    },
  });
  const [championText, setChampionText] = useState('');

  const handleChampionClick = (championId: number) => {
    router.push(`/champ/${championId}`);
  };

  const handleOnChangeChampionText = (e: ChangeEvent<HTMLInputElement>) => {
    setChampionText(e.target.value);
  };
  return (
    <Container>
      <SearchInputContainer>
        <Search />
        <ChampionSearchInput
          placeholder="챔피언 검색"
          type="text"
          value={championText}
          onChange={handleOnChangeChampionText}
        />
      </SearchInputContainer>
      <ChampionWrapperContainer>
        {champs?.map((champ) => (
          <ChampionWrapper
            key={champ.id}
            onClick={() => handleChampionClick(champ.id)}
          >
            <Image
              src={champ.images.square}
              alt={champ.name}
              width={60}
              height={60}
            />
            <p className="truncate w-[60px] text-center">{champ.name}</p>
          </ChampionWrapper>
        ))}
      </ChampionWrapperContainer>
    </Container>
  );
}
