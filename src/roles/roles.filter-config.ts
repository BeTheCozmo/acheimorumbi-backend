import { FilterMode, ModelConfig } from 'src/common/utils/prisma-filter.util';

/**
 * Configuração completa para o modelo Role
 *
 * - filterConfig: Define como cada campo deve ser filtrado (CONTAINS ou EXACT)
 * - sortableFields: Lista de campos permitidos para ordenação
 */
export const ROLE_CONFIG: ModelConfig = {
  filterConfig: {
    name: FilterMode.CONTAINS, // Nome de role geralmente é exato
  },
  sortableFields: [
    'name',
    'createdAt',
    'updatedAt',
  ],
};
