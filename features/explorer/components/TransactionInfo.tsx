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
import type { FiatMethod, Transaction } from '../types';
import type { AdditionalInfoProps } from './AdditionalInfo';
import AdditionalInfo from './AdditionalInfo';

type Props = Transaction & {
  fiatMethod: FiatMethod;
};

const TransactionInfo = ({
  hash,
  size,
  isConfirmed,
  confirmations,
  fees,
  inputs,
  outputs,
  received,
  fiatMethod,
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
        value: inputs[fiatMethod],
      },
      {
        icon: <UploadIcon />,
        label: 'Total BTC output',
        value: outputs[fiatMethod],
      },
      {
        icon: <CashIcon />,
        label: 'Total fees',
        value: fees[fiatMethod],
      },
    ],
    [
      hash,
      received,
      isConfirmed,
      size,
      confirmations,
      inputs,
      outputs,
      fees,
      fiatMethod,
    ]
  );

  return (
    <>
      {transactionFields.map(({ label, ...rest }) => (
        <AdditionalInfo key={label} label={label} {...rest} />
      ))}
    </>
  );
};

export default TransactionInfo;
