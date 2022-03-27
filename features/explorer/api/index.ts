import { instance } from 'config/instance';
import { API_URLS } from 'config/urls';
import { Transaction } from '../types';

export const callGetTransaction = (hash: string) =>
  instance.get<Transaction>(`${API_URLS.TRANSACTION}/${hash}`);

export const callGetAddress = (address: string) =>
  instance.get(`${API_URLS.ADDRESS}/${address}`);
