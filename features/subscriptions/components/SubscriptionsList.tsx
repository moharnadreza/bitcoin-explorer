import { BanIcon, InformationCircleIcon } from '@heroicons/react/solid';
import Button from 'components/Button';
import LoadingIcon from 'components/Button/LoadingIcon';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useSubscriptions } from '../hooks/useSubscriptions';

const LoadingWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 flex items-center justify-center">
      <div className="flex items-center space-x-2 text-sm">{children}</div>
    </div>
  );
};

const Subscriptions = (): JSX.Element => {
  const { push } = useRouter();
  const { subscriptions, isFetching } = useSubscriptions();

  if (isFetching) {
    return (
      <LoadingWrapper>
        <LoadingIcon width={18} height={18} />
        <span>Loading...</span>
      </LoadingWrapper>
    );
  }

  if (!subscriptions?.length) {
    return (
      <LoadingWrapper>
        <BanIcon width={18} height={18} />
        <span>There is no data to show...</span>
      </LoadingWrapper>
    );
  }

  return (
    <div
      className="bg-gray-50 rounded-2xl p-6 grid grid-cols-1 gap-5"
      data-cy="subscriptionsList"
    >
      {subscriptions?.map(({ hash, type }) => (
        <div key={hash} className="flex items-center space-x-4">
          <div className="flex-1 truncate flex items-center space-x-1 text-sm">
            <span className="font-medium">Hash:</span>
            <span className="flex-1 truncate">{hash}</span>
          </div>

          <Button
            icon={<InformationCircleIcon />}
            size="small"
            colorScheme="gray"
            onClick={() => push(`/${type.toLowerCase()}/${hash}`)}
          >
            View Details
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Subscriptions;
