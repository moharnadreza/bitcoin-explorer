import type { SearchQueryType } from 'features/explorer/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { SUBSCRIPTION_TABLE_KEY } from 'pages/api/config';
import { supabase } from 'pages/api/utils/supabase';

type SubscribedHashTable = {
  user: string;
  hash: string;
};

type Response = {
  message: string;
};

const subscribeHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const {
    data: { user, hash },
  } = req.body;

  try {
    const { data: isSubscribed } = await supabase
      .from<SubscribedHashTable>(SUBSCRIPTION_TABLE_KEY)
      .select()
      .filter('user', 'eq', user)
      .filter('hash', 'eq', hash)
      .single();

    if (isSubscribed) {
      await supabase
        .from<SubscribedHashTable>(SUBSCRIPTION_TABLE_KEY)
        .delete()
        .match({ user, hash });

      return res.status(200).json({
        message: 'Subscription deleted successfully.',
      });
    }

    await supabase
      .from<SubscribedHashTable>(SUBSCRIPTION_TABLE_KEY)
      .upsert({ user, hash })
      .single();

    res.status(200).json({
      message: 'Subscription created successfully.',
    });
  } catch (error) {
    throw new Error('Something went wrong, try again later.');
  }
};

export default subscribeHandler;
