import { FilterMode, FieldFilterConfig } from 'src/common/utils/prisma-filter.util';

export const ROLE_FILTER_CONFIG: FieldFilterConfig = {
  name: FilterMode.EXACT, // Nome de role geralmente é exato
};
