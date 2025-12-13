import { $Enums, Contract } from "@prisma/client";

export class ContractDto implements Contract {
  status: $Enums.ContractStatus;
  type: $Enums.ContractType;
  id: number;
  propertyId: number;
  ownerCode: string;
  acquirerCode: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}