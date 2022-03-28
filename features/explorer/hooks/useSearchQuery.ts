import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { getCurrentUser } from 'utils/getCurrentUser';
import { callGetAddress, callGetTransaction, callSubscribe } from '../api';
import type {
  Address,
  QuerySearchParams,
  SearchQueryType,
  Transaction,
} from '../types';

const callSearchQueryByType: Record<
  SearchQueryType,
  ({
    user,
    hash,
  }: QuerySearchParams) => Promise<AxiosResponse<Transaction | Address>>
> = {
  ADDRESS: callGetAddress,
  TRANSACTION: callGetTransaction,
};

type Params = {
  searchQuery: string;
  type?: SearchQueryType;
  isExploreEnabled?: boolean;
};

export const useSearchQuery = ({
  type,
  searchQuery,
  isExploreEnabled = false,
}: Params) => {
  const user = getCurrentUser();

  const {
    data: exploreData,
    refetch: getExploreData,
    isFetching: isLoadingExplore,
  } = useQuery(
    `/${type}/${searchQuery}`,
    () =>
      type &&
      callSearchQueryByType[type]({ user, hash: searchQuery }).then(
        ({ data }) => data
      ),
    {
      onError: () => {
        toast.error('Failed to load data, try again later.');
      },
      enabled: isExploreEnabled,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const { refetch: onSubscribe, isFetching: isSubscribeLoading } = useQuery(
    `/${user}/${type}/${searchQuery}`,
    () => callSubscribe({ user, hash: searchQuery, type }),
    {
      onSuccess: async () => {
        await getExploreData();

        toast.success('Subscription updated successfully.');
      },
      onError: () => {
        toast.error('Something went wrong, try again later.');
      },
      enabled: false,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  return {
    exploreData,
    getExploreData,
    isLoadingExplore,
    onSubscribe,
    isSubscribeLoading,
  };
};
