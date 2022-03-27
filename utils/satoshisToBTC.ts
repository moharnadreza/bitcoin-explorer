import { satoshisToBitcoin } from 'bitcoin-conversion';

/**
 * format provided satoshi value to BTC
 * @example 463388644 ~> 4.63388644 BTC
 */
export const satoshisToBTC = (satoshi: number) => {
  return `${satoshisToBitcoin(satoshi)} BTC`;
};
