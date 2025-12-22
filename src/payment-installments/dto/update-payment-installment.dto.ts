import { PartialType } from '@nestjs/swagger';
import { CreatePaymentInstallmentDto } from './create-payment-installment.dto';

export class UpdatePaymentInstallmentDto extends PartialType(CreatePaymentInstallmentDto) {}
