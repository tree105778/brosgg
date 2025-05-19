import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

module.exports = {
  images: {
    remotePatterns: [
      new URL(
        'https://brosgses.my.canva.site/champ-home/_assets/media/12509eb9a127a141cedee169e1e59aac.png',
      ),
    ],
  },
};

export default nextConfig;
