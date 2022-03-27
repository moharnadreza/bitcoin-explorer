import { validate as validateBitcoinAddress } from 'bitcoin-address-validation';
import type { SearchQueryForm, SearchQueryType } from '../types';

type ValidateSearchQueryParams = {
  type: SearchQueryType;
  validator: (searchQuery: SearchQueryForm['searchQuery']) => boolean;
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
  searchQuery: SearchQueryForm['searchQuery']
): SearchQueryType | undefined => {
  for (const { type, validator } of validateSearchQuery) {
    if (validator(searchQuery)) return type;
  }
};
