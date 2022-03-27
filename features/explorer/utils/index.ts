import { validate as validateBitcoinAddress } from 'bitcoin-address-validation';
import type { SearchQueryType } from '../types';

type ValidateSearchQueryParams = {
  type: SearchQueryType;
  validator: (searchQuery: string) => boolean;
};

const validateSearchQuery: ValidateSearchQueryParams[] = [
  {
    type: 'ADDRESS',
    validator: (searchQuery) => validateBitcoinAddress(searchQuery),
  },
  {
    type: 'TRANSACTION',
    validator: (searchQuery) => /^[a-fA-F0-9]{64}$/i.test(searchQuery),
  },
];

export const getSearchQueryType = (
  searchQuery: string
): SearchQueryType | undefined => {
  for (const { type, validator } of validateSearchQuery) {
    if (validator(searchQuery)) return type;
  }
};
