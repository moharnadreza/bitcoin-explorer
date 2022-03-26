import MainLayout from 'components/MainLayout';
import type { AppProps } from 'next/app';
import 'styles/globals.css';

type Props = AppProps;

const App = ({ Component, pageProps }: Props) => {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
};

export default App;
