import { PartialType } from '@nestjs/swagger';
import { CreatePaymentInstallmentDto } from './create-payment-installment.dto';
import { PaymentInstallmentDto } from './payment-installment.dto';

export class UpdatePaymentInstallmentDto extends PartialType(PaymentInstallmentDto) {}
