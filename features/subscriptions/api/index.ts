import { instance } from 'config/instance';
import { API_URLS } from 'config/urls';
import { GetSubscriptionsParams, Subscription } from '../types';

export const callGetSubscriptions = ({ user }: GetSubscriptionsParams) =>
  instance.post<Subscription[]>(API_URLS.SUBSCRIPTIONS, {
    data: user,
  });
