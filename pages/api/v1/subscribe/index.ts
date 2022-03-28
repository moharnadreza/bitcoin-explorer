import type { NextApiRequest, NextApiResponse } from 'next';
import { SUBSCRIPTION_TABLE_KEY } from 'pages/api/config';
import type { SubscriptionTableResponse } from 'pages/api/types';
import { supabase } from 'pages/api/utils/supabase';

type Response = {
  message: string;
};

const subscribeHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const {
    data: { user, hash, type },
  } = req.body;

  try {
    const { data: isSubscribed } = await supabase
      .from<SubscriptionTableResponse>(SUBSCRIPTION_TABLE_KEY)
      .select()
      .filter('user', 'eq', user)
      .filter('hash', 'eq', hash)
      .single();

    if (isSubscribed) {
      await supabase
        .from<SubscriptionTableResponse>(SUBSCRIPTION_TABLE_KEY)
        .delete()
        .match({ user, hash });

      return res.status(200).json({
        message: 'Subscription deleted successfully.',
      });
    }

    await supabase
      .from<SubscriptionTableResponse>(SUBSCRIPTION_TABLE_KEY)
      .upsert({ user, hash, type })
      .single();

    res.status(200).json({
      message: 'Subscription created successfully.',
    });
  } catch (error) {
    throw new Error('Something went wrong, try again later.');
  }
};

export default subscribeHandler;
