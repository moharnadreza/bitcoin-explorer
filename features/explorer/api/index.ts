import { instance } from 'config/instance';
import { API_URLS } from 'config/urls';
import type { QuerySearchParams, SearchQueryType, Transaction } from '../types';

export const callGetTransaction = ({ hash, user }: QuerySearchParams) =>
  instance.post<Transaction>(`${API_URLS.TRANSACTION}/${hash}`, {
    data: user,
  });

export const callGetAddress = ({ hash, user }: QuerySearchParams) =>
  instance.post(`${API_URLS.ADDRESS}/${hash}`, {
    data: user,
  });

export const callSubscribe = ({
  hash,
  user,
  type,
}: QuerySearchParams & { type?: SearchQueryType }) =>
  instance.post(`${API_URLS.SUBSCRIBE}`, {
    data: { user, hash, type },
  });
