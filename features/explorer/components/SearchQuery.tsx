import { SearchIcon } from '@heroicons/react/solid';
import Button from 'components/Button';
import Input from 'components/Input';
import { useMemo } from 'react';
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

const SearchQuery = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SearchQueryForm>({
    mode: 'all',
  });

  const searchQuery = watch('searchQuery');

  const searchType = useMemo(
    () => getSearchQueryType(searchQuery),
    [searchQuery]
  );

  const { data, refetch } = useSearchQuery({
    type: searchType,
    searchQuery,
  });

  const DetailsComponent = useMemo(
    () =>
      searchType && data
        ? SearchQueryInfoComponent[searchType]
        : SearchQueryInfoComponent['NO_MATCH_TYPE'],
    [searchType, data]
  );

  const onSubmit = async () => await refetch();

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
          isLoading={isSubmitting}
        >
          Search
        </Button>
      </form>

      <DetailsComponent {...(data as any)} />
    </div>
  );
};

export default SearchQuery;
