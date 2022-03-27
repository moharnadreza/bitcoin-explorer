import { DateTime } from 'luxon';

/**
 * format provided iso date user friendly shape
 * @example 2014-08-06T13:07:04.054 ~> Aug 6, 2014, 1:07:04 PM
 */
export const formatDate = (date: string): string => {
  return DateTime.fromISO(date).toFormat('FF');
};
