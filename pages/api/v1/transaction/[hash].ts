import type { Transaction } from 'features/explorer/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { EXPLORER_API_URLS } from 'pages/api/config';
import { explorerInstance } from 'pages/api/config/instance';
import type { TransactionResponse } from 'pages/api/types';
import { transformTransactionPayload } from 'pages/api/utils';

const transactionHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Transaction>
) => {
  const {
    query: { hash },
  } = req;

  try {
    const { data: transaction } =
      await explorerInstance.get<TransactionResponse>(
        `${EXPLORER_API_URLS.TRANSACTION}/${hash}`
      );

    const response = transformTransactionPayload(transaction);

    res.status(200).json(response);
  } catch (error) {
    // TODO: handle errors
  }
};

export default transactionHandler;
