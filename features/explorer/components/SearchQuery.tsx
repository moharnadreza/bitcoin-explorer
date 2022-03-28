import { SearchIcon } from '@heroicons/react/solid';
import Button from 'components/Button';
import Input from 'components/Input';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchQuery } from '../hooks/useSearchQuery';
import type { FiatMethod } from '../types';
import { getSearchQueryType } from '../utils';
import AddressInfo from './AddressInfo';
import SearchQueryResultWrapper from './SearchQueryResultWrapper';
import TransactionInfo from './TransactionInfo';

const SearchQueryInfoComponent = {
  ADDRESS: AddressInfo,
  TRANSACTION: TransactionInfo,
  NO_MATCH_TYPE: () => <></>,
};

type SearchQueryForm = {
  searchQuery: string;
};

const SearchQuery = (): JSX.Element => {
  const [fiatMethod, setFiatMethod] = useState<FiatMethod>('BTC');

  const {
    push,
    asPath,
    query: { id: defaultSearchQuery },
  } = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<SearchQueryForm>({
    mode: 'all',
    defaultValues: {
      searchQuery: defaultSearchQuery as string,
    },
  });

  const searchQuery = watch('searchQuery');

  const searchType = useMemo(
    () => getSearchQueryType(searchQuery),
    [searchQuery]
  );

  const {
    exploreData,
    getExploreData,
    isLoadingExplore,
    onSubscribe,
    isSubscribeLoading,
  } = useSearchQuery({
    type: searchType,
    searchQuery,
    isExploreEnabled:
      Boolean(defaultSearchQuery) &&
      asPath === `/${searchType?.toLowerCase()}/${searchQuery}`,
  });

  const onSubmit = async () => {
    if (searchType) {
      push(`/${searchType.toLowerCase()}/${searchQuery}`);
      return await getExploreData();
    }
  };

  useEffect(() => {
    if (defaultSearchQuery)
      setValue('searchQuery', defaultSearchQuery as string);
  }, [defaultSearchQuery, setValue]);

  const handleFiatMethodSwitch = (method: FiatMethod) => {
    setFiatMethod(method);
  };

  const DetailsComponent = useMemo(
    () =>
      searchType
        ? SearchQueryInfoComponent[searchType]
        : SearchQueryInfoComponent['NO_MATCH_TYPE'],
    [searchType]
  );

  return (
    <div className="grid gap-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row items-stretch sm:items-end gap-7 md:gap-4"
      >
        <Input
          {...register('searchQuery', {
            required: 'Please fill out this field.',
            validate: (searchQuery) =>
              !!getSearchQueryType(searchQuery) ||
              'Please enter an address or transaction hash.',
          })}
          data-cy="searchQuery"
          placeholder="Search for addresses and transactions..."
          label="Address or transaction hash"
          wrapperClassName="flex-1"
          error={errors.searchQuery?.message}
          required
        />

        <Button
          type="submit"
          data-cy="submit"
          icon={<SearchIcon />}
          disabled={!isValid}
          isLoading={isLoadingExplore}
        >
          Search
        </Button>
      </form>

      {exploreData && (
        <SearchQueryResultWrapper
          searchType={searchType}
          onSubscribe={onSubscribe}
          isSubscribed={exploreData?.isSubscribed}
          isSubscribeLoading={isSubscribeLoading}
          selectedFiatMethod={fiatMethod}
          onFiatMethodSwitch={handleFiatMethodSwitch}
        >
          <DetailsComponent {...(exploreData as any)} fiatMethod={fiatMethod} />
        </SearchQueryResultWrapper>
      )}
    </div>
  );
};

export default SearchQuery;
