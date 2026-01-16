import { FilterMode, ModelConfig } from 'src/common/utils/prisma-filter.util';

/**
 * Configuração completa para o modelo PartyForm
 *
 * - filterConfig: Define como cada campo deve ser filtrado (CONTAINS ou EXACT)
 * - sortableFields: Lista de campos permitidos para ordenação
 */
export const PARTY_FORM_CONFIG: ModelConfig = {
  filterConfig: {
    type: FilterMode.EXACT,
  },
  sortableFields: [
    'type',
  ],
};
