import { FilterMode, ModelConfig } from 'src/common/utils/prisma-filter.util';

/**
 * Configuração completa para o modelo Party
 *
 * - filterConfig: Define como cada campo deve ser filtrado (CONTAINS ou EXACT)
 * - sortableFields: Lista de campos permitidos para ordenação
 */
export const PARTY_CONFIG: ModelConfig = {
  filterConfig: {
    code: FilterMode.EXACT,
    type: FilterMode.EXACT,
  },
  sortableFields: [
    'id',
    'code',
    'type',
    'contractId',
    'createdAt',
    'updatedAt',
  ],
};
