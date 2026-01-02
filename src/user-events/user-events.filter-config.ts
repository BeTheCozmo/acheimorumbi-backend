import { FilterMode, FieldFilterConfig } from 'src/common/utils/prisma-filter.util';

export const USER_EVENT_FILTER_CONFIG: FieldFilterConfig = {
  action: FilterMode.EXACT,
  params: FilterMode.CONTAINS,
  body: FilterMode.CONTAINS,
  ip: FilterMode.EXACT,
  userAgent: FilterMode.CONTAINS,
  url: FilterMode.CONTAINS,
};
