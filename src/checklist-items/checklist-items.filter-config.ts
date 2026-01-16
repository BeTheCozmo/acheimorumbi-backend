import { FilterMode, ModelConfig } from 'src/common/utils/prisma-filter.util';

/**
 * Configuração completa para o modelo ChecklistItem
 *
 * - filterConfig: Define como cada campo deve ser filtrado (CONTAINS ou EXACT)
 * - sortableFields: Lista de campos permitidos para ordenação
 */
export const CHECKLIST_ITEM_CONFIG: ModelConfig = {
  filterConfig: {
    title: FilterMode.CONTAINS,
    instructions: FilterMode.CONTAINS,
    checked: FilterMode.EXACT,
  },
  sortableFields: [
    'id',
    'checklistTitleId',
    'title',
    'instructions',
    'order',
    'checked',
    'checkedAt',
    'createdAt',
    'updatedAt',
  ],
};
