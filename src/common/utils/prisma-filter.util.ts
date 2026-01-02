/**
 * Utility para criar filtros do Prisma com suporte a busca case-insensitive
 */

export enum FilterMode {
  CONTAINS = 'contains',  // Busca por substring (case-insensitive)
  EXACT = 'exact'         // Busca exata
}

export type FieldFilterConfig = Record<string, FilterMode>;

/**
 * Cria um objeto where do Prisma baseado nos filtros fornecidos
 * Usa a configuração de campos para determinar se usa busca por substring (contains) ou exata
 *
 * @param filters - Objeto com os filtros a serem aplicados
 * @param fieldConfig - Configuração de como cada campo deve ser filtrado
 *
 * @example
 * const config = {
 *   name: FilterMode.CONTAINS,
 *   email: FilterMode.CONTAINS,
 *   status: FilterMode.EXACT
 * };
 * const where = buildPrismaWhere(filters, config);
 */
export function buildPrismaWhere(filters: Record<string, any>, fieldConfig: FieldFilterConfig): any {
  const where: any = {};

  Object.keys(filters).forEach(key => {
    if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
      const value = filters[key];
      const filterMode = fieldConfig[key] || FilterMode.EXACT; // Padrão: busca exata

      if (typeof value === 'string') {
        if (filterMode === FilterMode.CONTAINS) {
          // Busca por substring case-insensitive
          where[key] = {
            contains: value,
          };
        } else {
          // Busca exata (para enums, códigos, etc)
          where[key] = value;
        }
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        // Números e booleanos sempre busca exata
        where[key] = value;
      } else if (value instanceof Date) {
        // Datas sempre busca exata
        where[key] = value;
      }
    }
  });

  return where;
}

/**
 * Remove a propriedade 'mode' de todos os objetos aninhados
 * Necessário para usar o where no Prisma count() que não aceita 'mode'
 */
export function removeMode(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => removeMode(item));
  }

  const result: any = {};
  for (const key in obj) {
    if (key !== 'mode') {
      result[key] = removeMode(obj[key]);
    }
  }
  return result;
}
