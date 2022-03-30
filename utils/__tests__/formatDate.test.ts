import { formatDate } from 'utils/formatDate';

describe('formatDate()', () => {
  it('Should format provided iso string date user friendly shape.', () => {
    expect(formatDate('2022-03-27T08:38:49.048Z')).toBe(
      '27 Mar 2022, 13:08:49'
    );
  });
});
