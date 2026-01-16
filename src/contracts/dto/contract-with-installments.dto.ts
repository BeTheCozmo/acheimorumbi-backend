import { Prisma } from "@prisma/client";

export type ContractWithInstallments = Prisma.ContractGetPayload<{
  include: {
    paymentInstallments: true;
  }
}>;
