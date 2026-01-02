import { FilterMode, FieldFilterConfig } from 'src/common/utils/prisma-filter.util';

export const USER_FILTER_CONFIG: FieldFilterConfig = {
  // Texto livre
  name: FilterMode.CONTAINS,
  email: FilterMode.CONTAINS,
  bankName: FilterMode.CONTAINS,

  // Busca exata
  roleId: FilterMode.EXACT,
  bankCode: FilterMode.EXACT,
  agency: FilterMode.EXACT,
  agencyDigit: FilterMode.EXACT,
  accountNumber: FilterMode.EXACT,
  accountDigit: FilterMode.EXACT,
  accountType: FilterMode.EXACT,
};
