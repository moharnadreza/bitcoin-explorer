import SearchQuery from '../components/SearchQuery';
import { SearchQuerySubmitParams } from '../types';

const ExplorerContainer = (): JSX.Element => {
  const handleSubmit = async ({
    searchQuery,
    type,
  }: SearchQuerySubmitParams) => {
    console.log({ searchQuery, type });
  };

  return (
    <>
      <div className="flex justify-center flex-col space-y-12">
        <h1 className="text-3xl font-bold ">Bitcoin Explorer</h1>

        <SearchQuery onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default ExplorerContainer;
