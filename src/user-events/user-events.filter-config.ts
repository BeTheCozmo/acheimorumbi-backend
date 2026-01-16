import { FilterMode, ModelConfig } from 'src/common/utils/prisma-filter.util';

/**
 * Configuração completa para o modelo UserEvents
 *
 * - filterConfig: Define como cada campo deve ser filtrado (CONTAINS ou EXACT)
 * - sortableFields: Lista de campos permitidos para ordenação
 */
export const USER_EVENT_CONFIG: ModelConfig = {
  filterConfig: {
    action: FilterMode.EXACT,
    params: FilterMode.CONTAINS,
    body: FilterMode.CONTAINS,
    ip: FilterMode.EXACT,
    userAgent: FilterMode.CONTAINS,
    url: FilterMode.CONTAINS,
  },
  sortableFields: [
    'id',
    'userId',
    'action',
    'params',
    'body',
    'ip',
    'userAgent',
    'url',
    'createdAt',
    'updatedAt',
  ],
};
