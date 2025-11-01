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
      new URL(
        'https://brosgses.my.canva.site/i-home/_assets/media/75c043e0e8f28434edb4838808864434.png',
      ),
      new URL(
        'https://gwwwhrtvwejvtwfxyugb.supabase.co/storage/v1/object/public/**',
      ),
      new URL('https://brosgg.s3.ap-northeast-2.amazonaws.com/**'),
      new URL('https://ddragon.leagueoflegends.com/cdn/**'),
      new URL('https://d18kctlbb86miz.cloudfront.net/**'),
      new URL('https://cdn.lolchess.gg/upload/images/**'),
    ],
  },
};

export default nextConfig;
