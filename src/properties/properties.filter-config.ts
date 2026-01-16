import { FilterMode, ModelConfig } from 'src/common/utils/prisma-filter.util';

/**
 * Configuração completa para o modelo Property
 *
 * - filterConfig: Define como cada campo deve ser filtrado (CONTAINS ou EXACT)
 * - sortableFields: Lista de campos permitidos para ordenação
 */
export const PROPERTY_CONFIG: ModelConfig = {
  filterConfig: {
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
  },
  sortableFields: [
    'id',
    'externalId',
    'name',
    'cep',
    'state',
    'city',
    'neighborhood',
    'street',
    'number',
    'complement',
    'condominium',
    'block',
    'unity',
    'condominiumValue',
    'iptuValue',
    'type',
    'status',
    'statusDate',
    'statusRegistry',
    'alienatedBank',
    'alienationRegistry',
    'registryOffice',
    'registryOfficeCity',
    'registrationNumber',
    'registeredWithAnotherOwner',
    'acquiredDate',
    'acquiredRegistry',
    'taxPayerNumber',
    'taxPayerName',
    'area',
    'parkingSpaces',
    'floorLevel',
    'electricityRegistration',
    'waterRegistration',
    'isWaterIndividual',
    'gasRegistration',
    'isGasIndividual',
    'observations',
    'referrerId',
    'createdAt',
    'updatedAt',
  ],
};
