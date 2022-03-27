import type { ReactNode } from 'react';
import Header from './Header';

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props): JSX.Element => {
  return (
    <div className="container max-w-xl mx-auto px-8 py-16 grid gap-32">
      <Header />

      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
