import type { Transaction } from 'features/explorer/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { EXPLORER_API_URLS, SUBSCRIPTION_TABLE_KEY } from 'pages/api/config';
import { explorerInstance } from 'pages/api/config/instance';
import type {
  SubscriptionTableResponse,
  TransactionResponse,
} from 'pages/api/types';
import { transformTransactionPayload } from 'pages/api/utils';
import { supabase } from 'pages/api/utils/supabase';

const transactionHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Transaction>
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

    const { data: transaction } =
      await explorerInstance.get<TransactionResponse>(
        `${EXPLORER_API_URLS.TRANSACTION}/${hash}`
      );

    const response = await transformTransactionPayload(transaction);

    res.status(200).json({ ...response, isSubscribed: !!isSubscribed });
  } catch (error) {
    throw new Error('Failed to load data, try again later.');
  }
};

export default transactionHandler;
