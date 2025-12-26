import { PrismaClient } from "@prisma/client";

export async function seedWitness(prisma: PrismaClient) {
  const witnesses = await prisma.witness.createMany({
    data: [
      {name: "João Pessoa", rg: "123456789", signature: "Jão Pessoar"},
      {name: "Maria Silva", rg: "987654321", signature: "Maria Sirva"},
      {name: "Pedro Costa", rg: "111111111", signature: "Pedro Coxta"}
    ]
  });
  return witnesses;
}
