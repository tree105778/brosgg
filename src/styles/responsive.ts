import { css, SerializedStyles } from '@emotion/react';

/**
 * Responsive breakpoints
 * Mobile: < 640px
 * Tablet: 640px - 1024px
 * Desktop: >= 1024px
 */
export const breakpoints = {
  mobile: '640px',
  tablet: '1024px',
  desktop: '1440px',
};

/**
 * Media query utilities for emotion
 */
export const media = {
  mobile: (styles: SerializedStyles | string) => css`
    @media (max-width: ${breakpoints.mobile}) {
      ${styles}
    }
  `,
  tablet: (styles: SerializedStyles | string) => css`
    @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
      ${styles}
    }
  `,
  desktop: (styles: SerializedStyles | string) => css`
    @media (min-width: ${breakpoints.tablet}) {
      ${styles}
    }
  `,
  maxWidth: (width: string, styles: SerializedStyles | string) => css`
    @media (max-width: ${width}) {
      ${styles}
    }
  `,
  minWidth: (width: string, styles: SerializedStyles | string) => css`
    @media (min-width: ${width}) {
      ${styles}
    }
  `,
};
