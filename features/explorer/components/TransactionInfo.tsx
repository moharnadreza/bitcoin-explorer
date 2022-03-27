import {
  BadgeCheckIcon,
  CashIcon,
  ChartPieIcon,
  CheckCircleIcon,
  ClockIcon,
  DownloadIcon,
  FingerPrintIcon,
  UploadIcon,
} from '@heroicons/react/solid';
import { useMemo } from 'react';
import { formatDate } from 'utils/formatDate';
import { satoshisToBTC } from 'utils/satoshisToBTC';
import type { Transaction } from '../types';
import AdditionalInfo, { AdditionalInfoProps } from './AdditionalInfo';

type Props = Transaction;

const TransactionInfo = ({
  hash,
  size,
  isConfirmed,
  confirmations,
  fees,
  inputs,
  outputs,
  received,
}: Props): JSX.Element => {
  const transactionFields = useMemo<AdditionalInfoProps[]>(
    () => [
      {
        icon: <FingerPrintIcon />,
        label: 'Hash',
        value: hash,
        isCopyEnabled: true,
        wrapperClassName: 'col-span-full',
      },
      {
        icon: <ClockIcon />,
        label: 'Received time',
        value: formatDate(received),
        wrapperClassName: 'col-span-full',
      },
      {
        icon: <CheckCircleIcon />,
        label: 'Status',
        value: isConfirmed ? (
          <span className="ml-1 text-xs font-medium bg-green-100 text-green-600 px-2 py-1 rounded-md">
            Confirmed
          </span>
        ) : (
          <span className="ml-1 text-xs font-medium bg-red-100 text-red-600 px-2 py-1 rounded-md">
            Not Confirmed
          </span>
        ),
        wrapperClassName: 'col-span-full',
      },
      {
        icon: <ChartPieIcon />,
        label: 'Size',
        value: size,
      },
      {
        icon: <BadgeCheckIcon />,
        label: 'Confirmations',
        value: confirmations,
      },
      {
        icon: <DownloadIcon />,
        label: 'Total BTC input',
        value: inputs,
      },
      {
        icon: <UploadIcon />,
        label: 'Total BTC output',
        value: outputs,
      },
      {
        icon: <CashIcon />,
        label: 'Total fees',
        value: satoshisToBTC(fees),
      },
    ],
    [hash, received, isConfirmed, size, confirmations, inputs, outputs, fees]
  );

  return (
    <div className="bg-gray-50 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <h2 className="font-bold">Transaction</h2>
      {transactionFields.map(({ label, ...rest }) => (
        <AdditionalInfo key={label} label={label} {...rest} />
      ))}
    </div>
  );
};

export default TransactionInfo;
