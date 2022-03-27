import type { Address } from 'features/explorer/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { EXPLORER_API_URLS } from 'pages/api/config';
import { explorerInstance } from 'pages/api/config/instance';
import type { AddressResponse } from 'pages/api/types';
import { transformAddressPayload } from 'pages/api/utils';

const addressHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Address>
) => {
  const {
    query: { hash },
  } = req;

  try {
    const { data: address } = await explorerInstance.get<AddressResponse>(
      `${EXPLORER_API_URLS.ADDRESS}/${hash}`
    );

    const response = transformAddressPayload(address);

    res.status(200).json(response);
  } catch (error) {
    // TODO: handle errors
  }
};

export default addressHandler;
