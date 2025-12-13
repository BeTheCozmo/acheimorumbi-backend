import { PrismaClient, Property } from "@prisma/client";

export async function seedContracts(prisma: PrismaClient, property: Property) {
  return await prisma.contract.create({
    data: {
      acquirerCode: "AC123",
      ownerCode: "OW123",
      type: "SALE",
      attachedDocuments: undefined,
      propertyId: property.id,
      value: 200000,
      status: "PENDING",
      checklistTitles: {
        createMany: {
          data: [
            {
              title: "Criação dos grupos Vendedores e Compradores e da pasta com o número e o nome do processo",
              order: 1,
            }
          ]
        }
      }
    }
  })
}
