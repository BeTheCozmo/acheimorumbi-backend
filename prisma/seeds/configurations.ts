import { PrismaClient } from "@prisma/client";

export async function seedConfigurations(prisma: PrismaClient) {
  return await prisma.configuration.createMany({
    data: [
      {
        name: 'porcentagemIntermediacao',
        value: '10'
      }
    ]
  })
}