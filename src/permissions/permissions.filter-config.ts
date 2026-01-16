import { FilterMode, ModelConfig } from 'src/common/utils/prisma-filter.util';

/**
 * Configuração completa para o modelo Permission
 *
 * - filterConfig: Define como cada campo deve ser filtrado (CONTAINS ou EXACT)
 * - sortableFields: Lista de campos permitidos para ordenação
 */
export const PERMISSION_CONFIG: ModelConfig = {
  filterConfig: {
    name: FilterMode.EXACT,
  },
  sortableFields: [
    'name',
    'createdAt',
    'updatedAt',
  ],
};
