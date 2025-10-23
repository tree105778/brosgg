import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import RootLayout from '@/components/RootLayout';
import Head from 'next/head';
import localFont from 'next/font/local';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { initMSW } from '@/mocks';

if (process.env.NODE_ENV === 'development') {
  void initMSW();
}

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  adjustFontFallback: false,
  variable: '--font-pretendard',
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 5분
            staleTime: 1000 * 60 * 5,
          },
        },
      }),
  );

  return (
    <>
      <Head>
        <title>BROS.GG</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <main className={pretendard.className}>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        </main>
        <ReactQueryDevtools
          initialIsOpen={process.env.NODE_ENV === 'development'}
        />
      </QueryClientProvider>
    </>
  );
}
