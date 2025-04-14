import { QueryClient } from 'react-query';
import { getStartAndEndOfMonthFromValue, isDifferentMonth } from '../date';

export const invalidateMonthIfNeeded = (
  queryClient: QueryClient,
  prev: Date,
  current: Date,
  memberNo: number
) => {
  if (isDifferentMonth(prev, current)) {
    const { startDate, endDate } = getStartAndEndOfMonthFromValue(current);
    queryClient.invalidateQueries(
      ['noti', 'dates', memberNo, startDate, endDate],
      { refetchInactive: true }
    );
  }
};