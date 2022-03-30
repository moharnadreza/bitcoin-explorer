import type { NextApiRequest, NextApiResponse } from 'next';
import { EXPLORER_API_URLS, SUBSCRIPTION_TABLE_KEY } from 'pages/api/config';
import { explorerInstance } from 'pages/api/config/instance';
import type {
  AddressResponse,
  SubscriptionTableResponse,
  TransactionResponse,
} from 'pages/api/types';
import { supabase } from 'pages/api/utils/supabase';

const EXPLORER_API_URLS_BY_TYPE = {
  ADDRESS: EXPLORER_API_URLS.ADDRESS,
  TRANSACTION: EXPLORER_API_URLS.TRANSACTION,
};

const subscriptionsCronJobHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { data } = await supabase
      .from<SubscriptionTableResponse>(SUBSCRIPTION_TABLE_KEY)
      .select('*');

    for (const { user, hash, type, confirmations } of data || []) {
      const { data: info } = await explorerInstance.get<
        AddressResponse | TransactionResponse
      >(`${EXPLORER_API_URLS_BY_TYPE[type]}/${hash}`);

      const notifications =
        // @ts-expect-error
        type === 'ADDRESS' ? info?.final_n_tx : info?.confirmations;

      if (confirmations !== notifications) {
        await supabase
          .from<SubscriptionTableResponse>(SUBSCRIPTION_TABLE_KEY)
          .update({ confirmations: notifications })
          .eq('user', user)
          .eq('hash', hash);
      }
    }

    return res.status(200).json({
      message:
        'Check for updates on subscribed addresses and transactions cron job succeed!',
    });
  } catch (error) {
    throw new Error('Something went wrong, try again later.');
  }
};

export default subscriptionsCronJobHandler;
