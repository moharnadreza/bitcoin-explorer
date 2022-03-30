import { getSearchQueryType } from 'features/explorer/utils';

describe('getSearchQueryType()', () => {
  it('Should return `TRANSACTION` type for valid transaction hash.', () => {
    expect(
      getSearchQueryType(
        '224e4a9bc0f56fec9911238072f81b6719222ab8edc934ec3d40ec19afecb74e'
      )
    ).toBe('TRANSACTION');
  });

  it('Should return `ADDRESS` type for valid transaction hash.', () => {
    expect(getSearchQueryType('13r2sMhxhWw8MnLg471rBGX3v18KGJ6ept')).toBe(
      'ADDRESS'
    );
  });

  it('Should return `undefined` for invalid transaction hash or address.', () => {
    expect(getSearchQueryType('hello')).toBeUndefined;
  });
});
