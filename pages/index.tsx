import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className="container max-w-lg mx-auto">
      <Head>
        <title>Bitcoin Explorer</title>
        <meta name="description" content="Bitcoin Explorer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold">Welcome to Bitcoin Explorer!</h1>
      </main>
    </div>
  );
};

export default Home;
