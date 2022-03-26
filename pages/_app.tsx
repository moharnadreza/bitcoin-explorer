import type { AppProps } from 'next/app';
import 'styles/globals.css';

type Props = AppProps;

const App = ({ Component, pageProps }: Props) => {
  return <Component {...pageProps} />;
};

export default App;
