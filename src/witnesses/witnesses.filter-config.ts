import { FilterMode, FieldFilterConfig } from 'src/common/utils/prisma-filter.util';

export const WITNESS_FILTER_CONFIG: FieldFilterConfig = {
  name: FilterMode.CONTAINS,
  rg: FilterMode.EXACT,
  signature: FilterMode.EXACT,
};
