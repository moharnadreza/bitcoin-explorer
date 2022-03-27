import { SearchIcon } from '@heroicons/react/solid';
import Button from 'components/Button';
import Input from 'components/Input';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchQuery } from '../hooks/useSearchQuery';
import { getSearchQueryType } from '../utils';
import AddressInfo from './AddressInfo';
import TransactionInfo from './TransactionInfo';

const SearchQueryInfoComponent = {
  ADDRESS: AddressInfo,
  TRANSACTION: TransactionInfo,
  NO_MATCH_TYPE: () => <></>,
};

type SearchQueryForm = {
  searchQuery: string;
};

type Props = {
  defaultSearchQuery?: string;
};

const SearchQuery = ({ defaultSearchQuery }: Props) => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SearchQueryForm>({
    mode: 'all',
  });

  const searchQuery = watch('searchQuery');

  const searchType = useMemo(
    () => getSearchQueryType(searchQuery),
    [searchQuery]
  );

  const { data, refetch, isFetching } = useSearchQuery({
    type: searchType,
    searchQuery,
  });

  const onSubmit = useCallback(async () => {
    if (searchType) {
      push(`/${searchType.toLowerCase()}/${searchQuery}`);
      return await refetch();
    }
  }, [push, refetch, searchType, searchQuery]);

  const getSearchQuery = useCallback(async () => await refetch(), [refetch]);

  useEffect(() => {
    if (defaultSearchQuery) {
      setValue('searchQuery', defaultSearchQuery);
      getSearchQuery();
    }
  }, [defaultSearchQuery, setValue, getSearchQuery]);

  const DetailsComponent = useMemo(
    () =>
      searchType && data
        ? SearchQueryInfoComponent[searchType]
        : SearchQueryInfoComponent['NO_MATCH_TYPE'],
    [searchType, data]
  );

  return (
    <div className="grid gap-24">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4"
      >
        <Input
          {...register('searchQuery', {
            required: 'Please fill out this field.',
            validate: (searchQuery) =>
              !!getSearchQueryType(searchQuery) ||
              'Please enter an address or transaction hash.',
          })}
          placeholder="Search for addresses and transactions..."
          label="Address or transaction hash"
          wrapperClassName="flex-1"
          error={errors.searchQuery?.message}
          required
        />

        <Button
          type="submit"
          icon={<SearchIcon />}
          disabled={!isValid}
          isLoading={isSubmitting || isFetching}
        >
          Search
        </Button>
      </form>

      <DetailsComponent {...(data as any)} />
    </div>
  );
};

export default SearchQuery;
