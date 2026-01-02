import { FilterMode, FieldFilterConfig } from 'src/common/utils/prisma-filter.util';

/**
 * Configuração de filtros para o modelo Property
 *
 * - CONTAINS: Campos de texto livre que permitem busca por substring
 * - EXACT: Campos que requerem correspondência exata (enums, IDs, códigos, etc)
 */
export const PROPERTY_FILTER_CONFIG: FieldFilterConfig = {
  // Texto livre - busca por substring
  name: FilterMode.CONTAINS,
  state: FilterMode.CONTAINS,
  city: FilterMode.CONTAINS,
  neighborhood: FilterMode.CONTAINS,
  street: FilterMode.CONTAINS,
  complement: FilterMode.CONTAINS,
  condominium: FilterMode.CONTAINS,
  alienatedBank: FilterMode.CONTAINS,
  registryOffice: FilterMode.CONTAINS,
  registryOfficeCity: FilterMode.CONTAINS,
  taxPayerName: FilterMode.CONTAINS,
  observations: FilterMode.CONTAINS,

  // Busca exata - enums, códigos, IDs, números
  externalId: FilterMode.EXACT,
  cep: FilterMode.EXACT,
  number: FilterMode.EXACT,
  block: FilterMode.EXACT,
  unity: FilterMode.EXACT,
  type: FilterMode.EXACT, // enum PropertyType
  status: FilterMode.EXACT, // enum PropertyStatus
  alienationRegistry: FilterMode.EXACT,
  registrationNumber: FilterMode.EXACT,
  taxPayerNumber: FilterMode.EXACT,
  area: FilterMode.EXACT,
  parkingSpaces: FilterMode.EXACT,
  floorLevel: FilterMode.EXACT,
  electricityRegistration: FilterMode.EXACT,
  waterRegistration: FilterMode.EXACT,
  gasRegistration: FilterMode.EXACT,
  condominiumValue: FilterMode.EXACT,
  iptuValue: FilterMode.EXACT,
  registeredWithAnotherOwner: FilterMode.EXACT, // boolean
  isWaterIndividual: FilterMode.EXACT, // boolean
  isGasIndividual: FilterMode.EXACT, // boolean
};
