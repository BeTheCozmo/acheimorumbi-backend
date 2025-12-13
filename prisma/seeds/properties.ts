import { PrismaClient } from "@prisma/client";

export async function seedProperties(prisma: PrismaClient) {
  return await prisma.property.create({
    data: {
      area: "100",
      complement: "Complemento",
      block: "Bloco A",
      unity: "Unidade 1",
      observations: "Observações",
      cep: "00000-000",
      city: "Cidade",
      state: "Estado",
      number: "123",
      street: "Rua",
      parkingSpaces: "2",
      externalId: "123456789",
      floorLevel: '1',
      name: "Casa Nova São Luiz",
      neighborhood: "Bairro",
      registrationNumber: "123456789",
      registryOffice: "Registro de Imóveis de São Paulo",
      suites: "2",
      type: "CONDOMINIUM",
    },
  });
}
