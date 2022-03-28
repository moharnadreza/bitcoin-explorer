import type { Address, Transaction } from 'features/explorer/types';
import {
  satoshisToBTC,
  satoshisToEUR,
  satoshisToUSD,
} from 'utils/satoshisToFiat';
import type { AddressResponse, TransactionResponse } from '../types';

const satoshisToFiat = async (satoshis: number) => {
  return {
    BTC: satoshisToBTC(satoshis),
    USD: await satoshisToUSD(satoshis),
    EUR: await satoshisToEUR(satoshis),
  };
};

export const transformTransactionPayload = async ({
  hash,
  fees,
  size,
  received,
  confirmations,
  inputs,
  outputs,
}: TransactionResponse): Promise<Transaction> => ({
  hash,
  fees: await satoshisToFiat(fees),
  size,
  received,
  confirmations,
  isConfirmed: confirmations > 0,
  inputs: inputs.length,
  outputs: outputs.length,
});

export const transformAddressPayload = async ({
  final_n_tx,
  total_received,
  txrefs,
  final_balance,
}: AddressResponse): Promise<Address> => ({
  confirmedTransactions: final_n_tx,
  totalReceived: await satoshisToFiat(total_received),
  totalBTCSpent: await satoshisToFiat(
    txrefs?.reduce(
      (current, { spent, value }) => (spent ? current + value : 0),
      0
    ) || 0
  ),
  totalBTCUnspent: await satoshisToFiat(
    txrefs?.reduce(
      (current, { spent, value }) => (!spent ? current + value : 0),
      0
    ) || 0
  ),
  finalBalance: await satoshisToFiat(final_balance),
});
