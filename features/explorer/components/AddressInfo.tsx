import {
  CheckCircleIcon,
  DownloadIcon,
  PlusCircleIcon,
  ChartPieIcon,
  CashIcon,
  CreditCardIcon,
} from '@heroicons/react/solid';
import { useMemo } from 'react';
import { satoshisToBTC } from 'utils/satoshisToBTC';
import type { Address } from '../types';
import AdditionalInfo, { AdditionalInfoProps } from './AdditionalInfo';

type Props = Address;

const AddressInfo = ({
  confirmedTransactions,
  finalBalance,
  totalReceived,
  totalBTCSpent,
  totalBTCUnspent,
}: Props): JSX.Element => {
  const addressFields = useMemo<AdditionalInfoProps[]>(
    () => [
      {
        icon: <CheckCircleIcon />,
        label: 'Confirmed transactions',
        value: confirmedTransactions,
        wrapperClassName: 'col-span-full',
      },
      {
        icon: <PlusCircleIcon />,
        label: 'Total BTC received',
        value: satoshisToBTC(totalReceived),
        wrapperClassName: 'col-span-full',
      },
      {
        icon: <CashIcon />,
        label: 'Total BTC spent',
        value: satoshisToBTC(totalBTCSpent || 0),
      },
      {
        icon: <CreditCardIcon />,
        label: 'Total BTC unspent',
        value: satoshisToBTC(totalBTCUnspent || 0),
      },
      {
        icon: <ChartPieIcon />,
        label: 'Current address balance',
        value: satoshisToBTC(finalBalance),
      },
    ],
    [
      confirmedTransactions,
      finalBalance,
      totalReceived,
      totalBTCSpent,
      totalBTCUnspent,
    ]
  );

  return (
    <div className="bg-gray-50 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <h2 className="font-bold">Address</h2>
      {addressFields.map(({ label, ...rest }) => (
        <AdditionalInfo key={label} label={label} {...rest} />
      ))}
    </div>
  );
};

export default AddressInfo;
