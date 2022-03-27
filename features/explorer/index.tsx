import { useRouter } from 'next/router';
import ExplorerContainer from './containers';

const Explorer = (): JSX.Element => {
  const {
    query: { id },
  } = useRouter();

  return <ExplorerContainer defaultSearchQuery={id as string} />;
};

export default Explorer;
