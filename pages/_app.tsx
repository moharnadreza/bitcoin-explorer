import MainLayout from 'components/MainLayout';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'styles/globals.css';

const queryClient = new QueryClient();

type Props = AppProps;

const App = ({ Component, pageProps }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        {/* <Head>
        <title>Bitcoin Explorer</title>
        <meta name="description" content="Bitcoin Explorer" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
        <Component {...pageProps} />
      </MainLayout>
      <Toaster
        toastOptions={{
          position: 'top-right',
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
