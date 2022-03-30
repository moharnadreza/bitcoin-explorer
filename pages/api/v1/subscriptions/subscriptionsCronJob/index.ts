import type { NextApiRequest, NextApiResponse } from 'next';
import { EXPLORER_API_URLS, SUBSCRIPTION_TABLE_KEY } from 'pages/api/config';
import { explorerInstance } from 'pages/api/config/instance';
import type {
  AddressResponse,
  SubscriptionTableResponse,
  TransactionResponse,
} from 'pages/api/types';
import { supabase } from 'pages/api/utils/supabase';

const joinSubscribedHashes = (hashes: string[]): string => {
  return hashes.join(';');
};

const subscriptionsCronJobHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { data } = await supabase
      .from<SubscriptionTableResponse>(SUBSCRIPTION_TABLE_KEY)
      .select('*');

    const subscribedHashes = data || [];

    const subscribedAddresses = subscribedHashes
      .filter(({ type }) => type === 'ADDRESS')
      .map(({ hash }) => hash);

    const isAddessSingular = subscribedAddresses.length === 1;

    const addressesToUpdate = isAddessSingular
      ? subscribedAddresses[0]
      : joinSubscribedHashes(subscribedAddresses);

    if (addressesToUpdate !== '') {
      const { data: addressesInfo } = await explorerInstance.get<
        AddressResponse[]
      >(`${EXPLORER_API_URLS.ADDRESS}/${addressesToUpdate}`);

      for (const { user, hash, confirmations } of subscribedHashes.filter(
        ({ type }) => type === 'ADDRESS'
      )) {
        const notifications = isAddessSingular
          ? (addressesInfo as unknown as AddressResponse).final_n_tx
          : addressesInfo.find(({ address }) => address === hash)?.final_n_tx;

        if (confirmations !== notifications) {
          await supabase
            .from<SubscriptionTableResponse>(SUBSCRIPTION_TABLE_KEY)
            .update({
              confirmations: notifications,
            })
            .eq('user', user)
            .eq('hash', hash);
        }
      }
    }

    const subscribedTransactions = subscribedHashes
      .filter(({ type }) => type === 'TRANSACTION')
      .map(({ hash }) => hash);

    const isTransactionSingular = subscribedTransactions.length === 1;

    const transactionsToUpdate = isTransactionSingular
      ? subscribedTransactions[0]
      : joinSubscribedHashes(subscribedTransactions);

    if (transactionsToUpdate !== '') {
      const { data: transactionsInfo } = await explorerInstance.get<
        TransactionResponse[]
      >(`${EXPLORER_API_URLS.TRANSACTION}/${transactionsToUpdate}`);

      for (const { user, hash, confirmations } of subscribedHashes.filter(
        ({ type }) => type === 'TRANSACTION'
      )) {
        const notifications = isTransactionSingular
          ? (transactionsInfo as unknown as TransactionResponse)?.confirmations
          : transactionsInfo.find(
              ({ hash: transactionHash }) => transactionHash === hash
            )?.confirmations;

        if (confirmations !== notifications) {
          await supabase
            .from<SubscriptionTableResponse>(SUBSCRIPTION_TABLE_KEY)
            .update({
              confirmations: notifications,
            })
            .eq('user', user)
            .eq('hash', hash);
        }
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
