import {
  CashIcon,
  ChartPieIcon,
  CheckCircleIcon,
  CreditCardIcon,
  PlusCircleIcon,
} from '@heroicons/react/solid';
import { useMemo } from 'react';
import type { Address, FiatMethod } from '../types';
import type { AdditionalInfoProps } from './AdditionalInfo';
import AdditionalInfo from './AdditionalInfo';

type Props = Address & {
  fiatMethod: FiatMethod;
};

const AddressInfo = ({
  confirmedTransactions,
  finalBalance,
  totalReceived,
  totalBTCSpent,
  totalBTCUnspent,
  fiatMethod,
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
        value: totalReceived[fiatMethod],
        wrapperClassName: 'col-span-full',
      },
      {
        icon: <CashIcon />,
        label: 'Total BTC spent',
        value: totalBTCSpent[fiatMethod],
      },
      {
        icon: <CreditCardIcon />,
        label: 'Total BTC unspent',
        value: totalBTCUnspent[fiatMethod],
      },
      {
        icon: <ChartPieIcon />,
        label: 'Current address balance',
        value: finalBalance[fiatMethod],
      },
    ],
    [
      confirmedTransactions,
      finalBalance,
      totalReceived,
      totalBTCSpent,
      totalBTCUnspent,
      fiatMethod,
    ]
  );

  return (
    <>
      {addressFields.map(({ label, ...rest }) => (
        <AdditionalInfo key={label} label={label} {...rest} />
      ))}
    </>
  );
};

export default AddressInfo;
