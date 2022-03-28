import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { getCurrentUser } from 'utils/getCurrentUser';
import { callGetSubscriptions } from '../api';

export const useSubscriptions = () => {
  const user = getCurrentUser();

  const { data: subscriptions, isFetching } = useQuery(
    `/${user}`,
    () => callGetSubscriptions({ user }).then(({ data }) => data),
    {
      onError: () => {
        toast.error('Failed to load data, try again later.');
      },
      refetchOnWindowFocus: false,
    }
  );

  return { subscriptions, isFetching };
};
