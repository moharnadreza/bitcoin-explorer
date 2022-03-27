import SearchQuery from '../components/SearchQuery';

const ExplorerContainer = (): JSX.Element => {
  return (
    <>
      <div className="flex justify-center flex-col space-y-8">
        <h1 className="text-3xl font-bold ">Bitcoin Explorer</h1>

        <SearchQuery />
      </div>
    </>
  );
};

export default ExplorerContainer;
