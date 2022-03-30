import { InformationCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { SUBSCRIPTION_TABLE_KEY } from 'pages/api/config';
import { SubscriptionTableResponse } from 'pages/api/types';
import { supabase } from 'pages/api/utils/supabase';
import { ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getCurrentUser } from 'utils/getCurrentUser';
import Button from './Button';
import Header from './Header';

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props): JSX.Element => {
  const { push } = useRouter();

  const user = getCurrentUser();

  useEffect(() => {
    supabase
      .from<SubscriptionTableResponse>(SUBSCRIPTION_TABLE_KEY)
      .on('UPDATE', ({ new: message }) => {
        if (user === message.user)
          toast(
            (t) => (
              <div className="flex flex-col gap-2">
                <span className="break-word">
                  Some changes detected on this subscribed hash:{' '}
                  <code className="break-all font-bold">{message.hash}</code>
                </span>
                <div className="flex items-center justify-end space-x-2">
                  <Button
                    icon={<XCircleIcon />}
                    colorScheme="gray"
                    size="small"
                    onClick={() => toast.dismiss(t.id)}
                  >
                    Dismiss
                  </Button>

                  <Button
                    icon={<InformationCircleIcon />}
                    size="small"
                    onClick={() => {
                      push(`/${message.type.toLowerCase()}/${message.hash}`);
                      toast.dismiss(t.id);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ),
            {
              duration: 50_000,
              icon: '🔔',
            }
          );
      })
      .subscribe();
  }, [push, user]);

  return (
    <div className="container max-w-4xl mx-auto px-6 md:px-8 py-6 md:py-16 grid gap-32">
      <Header />

      <main className="px-2 md:px-4">{children}</main>
    </div>
  );
};

export default MainLayout;
