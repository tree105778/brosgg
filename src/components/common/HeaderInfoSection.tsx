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
