import SearchQuery from '../components/SearchQuery';

type Props = {
  defaultSearchQuery?: string;
};

const ExplorerContainer = ({ defaultSearchQuery }: Props): JSX.Element => {
  return (
    <>
      <div className="flex justify-center flex-col space-y-12">
        <h1 className="text-3xl font-bold ">Bitcoin Explorer</h1>

        <SearchQuery defaultSearchQuery={defaultSearchQuery} />
      </div>
    </>
  );
};

export default ExplorerContainer;
