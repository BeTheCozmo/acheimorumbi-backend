import { FilterMode, ModelConfig } from 'src/common/utils/prisma-filter.util';

/**
 * Configuração completa para o modelo Document
 *
 * - filterConfig: Define como cada campo deve ser filtrado (CONTAINS ou EXACT)
 * - sortableFields: Lista de campos permitidos para ordenação
 */
export const DOCUMENT_CONFIG: ModelConfig = {
  filterConfig: {
    name: FilterMode.CONTAINS,
    url: FilterMode.EXACT,
  },
  sortableFields: [
    'id',
    'name',
    'url',
    'contractId',
    'createdAt',
    'updatedAt',
  ],
};
