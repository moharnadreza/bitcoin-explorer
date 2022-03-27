import type { TransactionResponse } from '../types';

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
