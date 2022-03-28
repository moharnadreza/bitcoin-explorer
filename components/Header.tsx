import { BellIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import Button from './Button';

const Header = () => {
  const { push } = useRouter();

  return (
    <div className="flex items-center justify-between bg-gray-50 px-8 py-6 rounded-xl">
      <span
        className="font-bold flex-1 cursor-pointer"
        onClick={() => push('/')}
      >
        Bitcoin Explorer
      </span>

      <Button
        onClick={() => push('/subscriptions')}
        icon={<BellIcon />}
        size="small"
      >
        Subscriptions
      </Button>
    </div>
  );
};

export default Header;
