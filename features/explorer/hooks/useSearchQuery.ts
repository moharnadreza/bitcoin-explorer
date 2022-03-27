import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { callGetAddress, callGetTransaction } from '../api';
import type { Address, SearchQueryType, Transaction } from '../types';

const callSearchQueryByType: Record<
  SearchQueryType,
  (value: string) => Promise<AxiosResponse<Transaction | Address>>
> = {
  ADDRESS: callGetAddress,
  TRANSACTION: callGetTransaction,
};

type Params = {
  searchQuery: string;
  type?: SearchQueryType;
  enabled?: boolean;
};

export const useSearchQuery = ({
  type,
  searchQuery,
  enabled = false,
}: Params) => {
  const { data, refetch, isFetching } = useQuery(
    `/${type}/${searchQuery}`,
    () =>
      type && callSearchQueryByType[type](searchQuery).then(({ data }) => data),
    {
      onError: () => {
        toast.error('Failed to load data, try again later.');
      },
      enabled,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  return { data, refetch, isFetching };
};
