export type SearchQueryType = 'ADDRESS' | 'TRANSACTION';

export type SearchQuerySubmitParams = {
  searchQuery: string;
  type?: SearchQueryType;
};

export type Transaction = {
  hash: string;
  fees: number;
  size: number;
  received: string;
  confirmations: number;
  isConfirmed: boolean;
  inputs: number;
  outputs: number;
};

export type Address = {
  confirmedTransactions: number;
  totalReceived: number;
  totalBTCSpent?: number;
  totalBTCUnspent?: number;
  finalBalance: number;
};
