import type { AddressResponse, TransactionResponse } from '../types';

export const transformTransactionPayload = ({
  hash,
  fees,
  size,
  received,
  confirmations,
  inputs,
  outputs,
}: TransactionResponse) => ({
  hash,
  fees,
  size,
  received,
  confirmations,
  isConfirmed: confirmations > 0,
  inputs: inputs.length,
  outputs: outputs.length,
});

export const transformAddressPayload = ({
  address,
  final_n_tx,
  total_received,
  txrefs,
  final_balance,
}: AddressResponse) => ({
  address,
  confirmedTransactions: final_n_tx,
  totalReceived: total_received,
  totalBTCSpent: txrefs?.reduce(
    (current, { spent, value }) => (spent ? current + value : 0),
    0
  ),
  totalBTCUnSpent: txrefs?.reduce(
    (current, { spent, value }) => (!spent ? current + value : 0),
    0
  ),
  finalBalance: final_balance,
});
