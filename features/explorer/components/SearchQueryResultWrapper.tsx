import { BellIcon } from '@heroicons/react/solid';
import Button from 'components/Button';
import FiatMethodSwitch from 'components/FiatMethodSwitch';
import type { ReactNode } from 'react';
import type { FiatMethod, SearchQueryType } from '../types';

type Props = {
  onSubscribe: () => void;
  children: ReactNode;
  searchType?: SearchQueryType;
  isSubscribeLoading: boolean;
  isSubscribed?: boolean;
  onFiatMethodSwitch: (method: FiatMethod) => void;
  selectedFiatMethod: FiatMethod;
};

const SearchQueryWrapper = ({
  searchType,
  onSubscribe,
  onFiatMethodSwitch,
  selectedFiatMethod,
  children,
  isSubscribeLoading,
  isSubscribed,
}: Props) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div className="col-span-full flex flex-col sm:flex-row items-center border-b-2 border-gray-300 pb-6 gap-4">
        <h2 className="flex-1 font-bold" data-cy="searchType">
          {searchType}
        </h2>

        <Button
          icon={<BellIcon />}
          size="small"
          colorScheme="gray"
          data-cy="subscribe"
          onClick={onSubscribe}
          isLoading={isSubscribeLoading}
        >
          {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
        </Button>

        <FiatMethodSwitch
          fiatMethods={['BTC', 'USD', 'EUR']}
          selectedFiatMethod={selectedFiatMethod}
          onSwitch={onFiatMethodSwitch}
        />
      </div>

      {children}
    </div>
  );
};

export default SearchQueryWrapper;
