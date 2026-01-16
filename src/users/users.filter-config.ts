import { FilterMode, ModelConfig } from 'src/common/utils/prisma-filter.util';

/**
 * Configuração completa para o modelo User
 *
 * - filterConfig: Define como cada campo deve ser filtrado (CONTAINS ou EXACT)
 * - sortableFields: Lista de campos permitidos para ordenação
 */
export const USER_CONFIG: ModelConfig = {
  filterConfig: {
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
  },
  sortableFields: [
    'id',
    'name',
    'email',
    'roleId',
    'bankName',
    'bankCode',
    'agency',
    'agencyDigit',
    'accountNumber',
    'accountDigit',
    'accountType',
    'pixKey',
    'pixType',
    'createdAt',
    'updatedAt',
  ],
};
