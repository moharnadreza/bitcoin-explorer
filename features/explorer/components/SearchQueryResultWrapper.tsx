import { BellIcon } from '@heroicons/react/solid';
import Button from 'components/Button';
import { ReactNode } from 'react';
import type { SearchQueryType } from '../types';

type Props = {
  onSubscribe: () => void;
  children: ReactNode;
  searchType?: SearchQueryType;
  isLoading: boolean;
  isSubscribed?: boolean;
};

const SearchQueryWrapper = ({
  searchType,
  onSubscribe,
  children,
  isLoading,
  isSubscribed,
}: Props) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="col-span-full flex items-center border-b-2 border-gray-300 pb-6">
        <h2 className="flex-1 font-bold">{searchType}</h2>

        <Button
          icon={<BellIcon />}
          size="small"
          colorScheme="gray"
          onClick={onSubscribe}
          isLoading={isLoading}
        >
          {isSubscribed ? 'Unsubscribe' : 'Subscribe'} for the changes
        </Button>
      </div>

      {children}
    </div>
  );
};

export default SearchQueryWrapper;
