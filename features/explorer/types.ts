export type SearchQueryType = 'ADDRESS' | 'TRANSACTION';

export type SearchQuerySubmitParams = {
  searchQuery: string;
  type?: SearchQueryType;
};

export type QuerySearchParams = {
  hash: string;
  user?: string;
};

type Subscribed = {
  isSubscribed?: boolean;
};

export type Transaction = Subscribed & {
  hash: string;
  fees: number;
  size: number;
  received: string;
  confirmations: number;
  isConfirmed: boolean;
  inputs: number;
  outputs: number;
};

export type Address = Subscribed & {
  confirmedTransactions: number;
  totalReceived: number;
  totalBTCSpent?: number;
  totalBTCUnspent?: number;
  finalBalance: number;
};
