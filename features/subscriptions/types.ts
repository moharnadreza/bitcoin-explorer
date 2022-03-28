import { SearchQueryType } from 'features/explorer/types';

export type GetSubscriptionsParams = {
  user?: string;
};

export type Subscription = {
  hash: string;
  type: SearchQueryType;
};
