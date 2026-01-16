import { FilterMode, ModelConfig } from 'src/common/utils/prisma-filter.util';

/**
 * Configuração completa para o modelo Witness
 *
 * - filterConfig: Define como cada campo deve ser filtrado (CONTAINS ou EXACT)
 * - sortableFields: Lista de campos permitidos para ordenação
 */
export const WITNESS_CONFIG: ModelConfig = {
  filterConfig: {
    name: FilterMode.CONTAINS,
    rg: FilterMode.EXACT,
    signature: FilterMode.EXACT,
  },
  sortableFields: [
    'id',
    'name',
    'rg',
    'signature',
  ],
};
