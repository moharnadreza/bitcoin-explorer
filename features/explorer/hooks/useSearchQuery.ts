import { AxiosResponse } from 'axios';
import { callGetAddress, callGetTransaction } from '../api';
import { useQuery } from 'react-query';
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
};

export const useSearchQuery = ({ type, searchQuery }: Params) => {
  const { data, refetch, isFetching } = useQuery(
    `/${type}/${searchQuery}`,
    () =>
      type && callSearchQueryByType[type](searchQuery).then(({ data }) => data),
    {
      onError: (error) => {
        // TODO: handle error
      },
      enabled: false,
      retry: false,
    }
  );

  return { data, refetch, isFetching };
};
