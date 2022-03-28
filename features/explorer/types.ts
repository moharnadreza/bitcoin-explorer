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

export type FiatMethod = 'BTC' | 'USD' | 'EUR';

type FiatValue<T extends string = string> = Record<FiatMethod, T>;

export type Transaction = Subscribed & {
  hash: string;
  fees: FiatValue;
  size: number;
  received: string;
  confirmations: number;
  isConfirmed: boolean;
  inputs: FiatValue;
  outputs: FiatValue;
};

export type Address = Subscribed & {
  confirmedTransactions: number;
  totalReceived: FiatValue;
  totalBTCSpent: FiatValue;
  totalBTCUnspent: FiatValue;
  finalBalance: FiatValue;
};
