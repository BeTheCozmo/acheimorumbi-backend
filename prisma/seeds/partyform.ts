import { PrismaClient } from "@prisma/client";

export async function seedPartyForm(prisma: PrismaClient) {
  return await prisma.partyForm.createMany({
    data: [
      { type: "BUYERS" },
      { type: "SELLERS" },
      { type: "LANDLORDS" },
      { type: "TENANTS" },
    ],
  });
}
