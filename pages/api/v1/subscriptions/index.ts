import type { NextApiRequest, NextApiResponse } from 'next';
import { SUBSCRIPTION_TABLE_KEY } from 'pages/api/config';
import type { SubscriptionTableResponse } from 'pages/api/types';
import { supabase } from 'pages/api/utils/supabase';

type Response = SubscriptionTableResponse[] | null;

const subscriptionsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const { data: user } = req.body;

  try {
    const { data } = await supabase
      .from<SubscriptionTableResponse>(SUBSCRIPTION_TABLE_KEY)
      .select('*')
      .eq('user', user)
      .order('created_at', { ascending: false });

    return res.status(200).json(data);
  } catch (error) {
    throw new Error('Something went wrong, try again later.');
  }
};

export default subscriptionsHandler;
