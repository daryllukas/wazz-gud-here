import type { AppProps } from 'next/app';
import { Layout } from '../src/components/Layout';
import { ModalContextProvider } from '../src/context/Modal';

import '../src/styles/globals.css';

const strapiApiUrl = 'http://localhost:1337/graphql';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ModalContextProvider>
  );
}

export default MyApp;
