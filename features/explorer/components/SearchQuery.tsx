import { SearchIcon } from '@heroicons/react/solid';
import Button from 'components/Button';
import Input from 'components/Input';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import type { SearchQuerySubmitParams, SearchQueryForm } from '../types';
import { getSearchQueryType } from '../utils';

type Props = {
  onSubmit: ({ searchQuery, type }: SearchQuerySubmitParams) => void;
};

const SearchQuery = ({ onSubmit }: Props) => {
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

  return (
    <form
      onSubmit={handleSubmit(({ searchQuery }) =>
        onSubmit({ searchQuery, type: searchType })
      )}
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
  );
};

export default SearchQuery;
