import { FilterMode, ModelConfig } from 'src/common/utils/prisma-filter.util';

/**
 * Configuração completa para o modelo Configuration
 *
 * - filterConfig: Define como cada campo deve ser filtrado (CONTAINS ou EXACT)
 * - sortableFields: Lista de campos permitidos para ordenação
 */
export const CONFIGURATION_CONFIG: ModelConfig = {
  filterConfig: {
    // Busca por substring - permite buscar configurações por parte do nome
    name: FilterMode.CONTAINS,
    // Busca por substring - permite buscar por valores parciais
    value: FilterMode.CONTAINS,
  },
  sortableFields: [
    'name',
    'value',
  ],
};
