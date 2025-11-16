import styled from '@emotion/styled';

const HeaderInfoSectionStyle = styled.div`
  width: 80%;
  background-color: var(--bg-theme4);
  color: white;
  margin: 0 auto;
  padding: 2rem;

  h1 {
    color: var(--text-theme2);
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 1024px) {
    width: 90%;
    padding: 1.5rem;

    h1 {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 640px) {
    width: 95%;
    padding: 1rem;

    h1 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 0.875rem;
    }
  }
`;

export default function HeaderInfoSection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <HeaderInfoSectionStyle>
      <h1>{title}</h1>
      <p>{description}</p>
    </HeaderInfoSectionStyle>
  );
}
