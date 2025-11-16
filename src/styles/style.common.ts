import styled from '@emotion/styled';

export const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  margin: 5rem auto;
  color: var(--text-theme1);

  @media (max-width: 1024px) {
    width: 90%;
    margin: 3rem auto;
  }

  @media (max-width: 640px) {
    width: 95%;
    margin: 2rem auto;
  }
`;

export const FirstInfoSection = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1rem;
  }
`;
