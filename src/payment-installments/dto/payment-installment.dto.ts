import { $Enums, PaymentInstallments, PaymentInstallmentsType } from "@prisma/client";

export class PaymentInstallmentDto {
  id: number;
  type: PaymentInstallmentsType;
  contractId: number;
  value: number;
  dueDate: Date;
  paid: boolean;
  paidAt: Date;
  bankOwner: string;
  bankName: string;
  bankCode: string;
  agency: string;
  agencyDigit: string;
  accountNumber: string;
  accountDigit: string;
  accountType: string;
}