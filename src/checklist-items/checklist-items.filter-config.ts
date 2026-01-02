import { FilterMode, FieldFilterConfig } from 'src/common/utils/prisma-filter.util';

export const CHECKLIST_ITEM_FILTER_CONFIG: FieldFilterConfig = {
  title: FilterMode.CONTAINS,
  instructions: FilterMode.CONTAINS,
  checked: FilterMode.EXACT,
};
