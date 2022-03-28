import { satoshisToBitcoin, satoshisToFiat } from 'bitcoin-conversion';

/**
 * format provided satoshi value to BTC
 * @example 463388644 ~> 4.63388644 BTC
 */
export const satoshisToBTC = (satoshis: number) => {
  const satoshisConvertedToBTC = satoshisToBitcoin(satoshis);

  return `${satoshisConvertedToBTC} BTC`;
};

/**
 * format provided satoshi value to USD
 * @example 463388644 ~> 218,025.5606 USD
 */
export const satoshisToUSD = async (satoshis: number) => {
  const satoshisConvertedToUSD = await satoshisToFiat(satoshis, 'USD');

  return `${satoshisConvertedToUSD} USD`;
};

/**
 * format provided satoshi value to EUR
 * @example 463388644 ~> 198,377.0971 EUR
 */
export const satoshisToEUR = async (satoshis: number) => {
  const satoshisConvertedToEUR = await satoshisToFiat(satoshis, 'EUR');

  return `${satoshisConvertedToEUR} EUR`;
};
