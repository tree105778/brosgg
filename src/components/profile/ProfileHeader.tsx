import Image from 'next/image';
import { css } from '@emotion/react';
import { useState } from 'react';

interface ProfileHeaderProps {
  name: string;
  tag: string;
  profileIconUrl: string;
  onRefresh?: () => void;
}

export default function ProfileHeader({
  name,
  tag,
  profileIconUrl,
  onRefresh,
}: ProfileHeaderProps) {
  const [selectedSet, setSelectedSet] = useState('TFT S14');

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 1.5rem;
        background-color: var(--bg-theme3);
        padding: 1.5rem 2rem;
        border-radius: 8px;
        width: 100%;
      `}
    >
      <Image
        src={profileIconUrl}
        alt={`${name} profile`}
        width={80}
        height={80}
        css={css`
          border-radius: 50%;
        `}
      />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 0.5rem;
          `}
        >
          <h1
            css={css`
              font-size: 1.5rem;
              font-weight: bold;
              color: var(--text-theme2);
              margin: 0;
            `}
          >
            {name}
          </h1>
          <span
            css={css`
              font-size: 1.5rem;
              color: var(--text-theme1);
            `}
          >
            #{tag}
          </span>
          <select
            value={selectedSet}
            onChange={(e) => setSelectedSet(e.target.value)}
            css={css`
              background-color: var(--bg-theme1);
              color: var(--text-theme1);
              //border: 1px solid #3a3a3a;
              border-radius: 6px;
              padding: 0.5rem 2rem 0.5rem 1rem;
              font-size: 0.875rem;
              font-weight: 600;
              cursor: pointer;
              appearance: none;
              background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23999999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
              background-repeat: no-repeat;
              background-position: right 0.75rem center;

              //&:hover {
              //  border-color: var(--main-theme);
              //}
              //
              &:focus {
                outline: none;
                //border-color: var(--main-theme);
              }
            `}
          >
            <option value="TFT S14">TFT S14</option>
            <option value="TFT S13">TFT S13</option>
            <option value="TFT S12">TFT S12</option>
          </select>
        </div>
        <button
          onClick={onRefresh}
          css={css`
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            background: #223b37;
            border: none;
            color: var(--text-theme2);
            font-size: 0.75rem;
            font-weight: 600;
            cursor: pointer;
            padding: 0.25rem 0.5rem;
            width: fit-content;

            &:hover {
              color: #06f1d2;
            }
          `}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
          </svg>
          전적 갱신
        </button>
      </div>
    </div>
  );
}
