import { FilterMode, FieldFilterConfig } from 'src/common/utils/prisma-filter.util';

export const PARTY_FILTER_CONFIG: FieldFilterConfig = {
  code: FilterMode.EXACT,
  type: FilterMode.EXACT,
};
