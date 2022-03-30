import {
  satoshisToBTC,
  satoshisToUSD,
  satoshisToEUR,
} from 'utils/satoshisToFiat';

describe('satoshisToBTC()', () => {
  it('Should format provided satoshi value to BTC.', () => {
    expect(satoshisToBTC(463388644)).toBe('4.63388644 BTC');
  });
});

describe('satoshisToUSD()', () => {
  it('Should format provided satoshi value to USD.', () => {
    // Since the value can be different due to price change, we can't
    // check the exact returned value
    expect(satoshisToUSD(463388644)).toBeTruthy();
  });
});

describe('satoshisToEUR()', () => {
  it('Should format provided satoshi value to EUR.', () => {
    // Since the value can be different due to price change, we can't
    // check the exact returned value
    expect(satoshisToEUR(463388644)).toBeTruthy();
  });
});
