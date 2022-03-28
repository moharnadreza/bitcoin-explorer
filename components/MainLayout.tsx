import type { ReactNode } from 'react';
import Header from './Header';

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props): JSX.Element => {
  return (
    <div className="container max-w-4xl mx-auto px-6 md:px-8 py-6 md:py-16 grid gap-32">
      <Header />

      <main className="px-2 md:px-4">{children}</main>
    </div>
  );
};

export default MainLayout;
