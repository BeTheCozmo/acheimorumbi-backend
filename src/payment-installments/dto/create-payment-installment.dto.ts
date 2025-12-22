import { PaymentInstallmentsType } from "../enums/payment-installments-type.enum";

export class CreatePaymentInstallmentDto  {
	type: PaymentInstallmentsType;
	contractId: number;
	value: number;
	dueDate: Date;
	paid: boolean;
	paidAt: Date;
	paidValue: number;
}
