import type { AppProps } from 'next/app'
import { NextUIProvider, createTheme, useSSR } from '@nextui-org/react';

const darkTheme = createTheme({ type: 'dark' });

export default function App({ Component, pageProps }: AppProps) {
  const isBrowser = useSSR();

  return (
    <NextUIProvider theme={darkTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}