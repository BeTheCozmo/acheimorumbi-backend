import { FilterMode, ModelConfig } from 'src/common/utils/prisma-filter.util';

/**
 * Configuração completa para o modelo Contract
 *
 * - filterConfig: Define como cada campo deve ser filtrado (CONTAINS ou EXACT)
 * - sortableFields: Lista de campos permitidos para ordenação
 */
export const CONTRACT_CONFIG: ModelConfig = {
  filterConfig: {
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
  },
  sortableFields: [
    'id',
    'propertyId',
    'ownerCode',
    'acquirerCode',
    'value',
    'intermediationPercentage',
    'status',
    'type',
    'guaranteeType',
    'leaseStartDate',
    'leaseEndDate',
    'rentDueDay',
    'bankOwner',
    'bankName',
    'bankCode',
    'agency',
    'agencyDigit',
    'accountNumber',
    'accountDigit',
    'accountType',
    'pixType',
    'pixKey',
    'whoWillPayComission',
    'createdAt',
    'updatedAt',
  ],
};
