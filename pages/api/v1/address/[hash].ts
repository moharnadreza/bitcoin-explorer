import type { Address } from 'features/explorer/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { EXPLORER_API_URLS, SUBSCRIPTION_TABLE_KEY } from 'pages/api/config';
import { explorerInstance } from 'pages/api/config/instance';
import type {
  AddressResponse,
  SubscriptionTableResponse,
} from 'pages/api/types';
import { transformAddressPayload } from 'pages/api/utils';
import { supabase } from 'pages/api/utils/supabase';

const addressHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Address>
) => {
  const {
    query: { hash },
    body: { data: user },
  } = req;

  try {
    const { data: isSubscribed } = await supabase
      .from<SubscriptionTableResponse>(SUBSCRIPTION_TABLE_KEY)
      .select()
      .filter('user', 'eq', user)
      .filter('hash', 'eq', hash)
      .single();

    const { data: address } = await explorerInstance.get<AddressResponse>(
      `${EXPLORER_API_URLS.ADDRESS}/${hash}`
    );

    const response = transformAddressPayload(address);

    res.status(200).json({ ...response, isSubscribed: !!isSubscribed });
  } catch (error) {
    throw new Error('Failed to load data, try again later.');
  }
};

export default addressHandler;
