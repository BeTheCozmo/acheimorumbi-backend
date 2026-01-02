import { FilterMode, FieldFilterConfig } from 'src/common/utils/prisma-filter.util';

export const DOCUMENT_FILTER_CONFIG: FieldFilterConfig = {
  name: FilterMode.CONTAINS,
  url: FilterMode.EXACT,
};
