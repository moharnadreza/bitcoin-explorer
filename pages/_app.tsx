import MainLayout from 'components/MainLayout';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'styles/globals.css';

const queryClient = new QueryClient();

type Props = AppProps;

const App = ({ Component, pageProps }: Props) => {
  return (
    <>
      <Head>
        <title>Bitcoin Explorer</title>
        <meta name="description" content="Bitcoin Explorer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>

        <Toaster
          containerClassName="toast"
          toastOptions={{
            position: 'top-right',
            duration: 5_000,
            style: {
              fontSize: '0.875rem', // text-sm
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
};

export default App;
