import { FilterMode, FieldFilterConfig } from 'src/common/utils/prisma-filter.util';

export const CONTRACT_FILTER_CONFIG: FieldFilterConfig = {
  // Texto livre
  guaranteeType: FilterMode.CONTAINS,
  bankName: FilterMode.CONTAINS,

  // Busca exata
  ownerCode: FilterMode.EXACT,
  acquirerCode: FilterMode.EXACT,
  status: FilterMode.EXACT, // enum ContractStatus
  type: FilterMode.EXACT, // enum ContractType
  bankCode: FilterMode.EXACT,
  agency: FilterMode.EXACT,
  agencyDigit: FilterMode.EXACT,
  accountNumber: FilterMode.EXACT,
  accountDigit: FilterMode.EXACT,
  accountType: FilterMode.EXACT,
  pixType: FilterMode.EXACT, // enum PixType
  pixKey: FilterMode.EXACT,
  whoWillPayComission: FilterMode.EXACT, // enum PartyType
};
