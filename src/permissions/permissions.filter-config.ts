import { FilterMode, FieldFilterConfig } from 'src/common/utils/prisma-filter.util';

export const PERMISSION_FILTER_CONFIG: FieldFilterConfig = {
  name: FilterMode.EXACT,
};
