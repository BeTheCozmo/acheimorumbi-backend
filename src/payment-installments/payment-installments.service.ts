import { Injectable } from '@nestjs/common';
import { CreatePaymentInstallmentDto } from './dto/create-payment-installment.dto';
import { UpdatePaymentInstallmentDto } from './dto/update-payment-installment.dto';
import { PaymentInstallmentsRepository } from './payment-installments.repository';
import { PaymentInstallmentsType } from './enums/payment-installments-type.enum';
import { PaymentInstallments } from '@prisma/client';

@Injectable()
export class PaymentInstallmentsService {
  constructor(
    private readonly paymentInstallmentsRepository: PaymentInstallmentsRepository,
  ) {}

  create(createPaymentInstallmentDto: CreatePaymentInstallmentDto) {
    return this.paymentInstallmentsRepository.create(createPaymentInstallmentDto);
  }

  async createDefaultInstallments(contractId: number) {
    const types = Object.values(PaymentInstallmentsType);
    let installmentsCreated = [] as PaymentInstallments[]
    for (const type of types) {
      installmentsCreated.push(await this.create({
        contractId,
        value: 0,
        dueDate: new Date(),
        paid: false,
        paidAt: null,
        paidValue: 0,
        type: type as PaymentInstallmentsType,
      }));
    }

    return installmentsCreated;
  }

  findAll() {
    return this.paymentInstallmentsRepository.findAll();
  }

  findOne(id: number) {
    return this.paymentInstallmentsRepository.findOne(id);
  }

  update(id: number, updatePaymentInstallmentDto: UpdatePaymentInstallmentDto) {
    return this.paymentInstallmentsRepository.update(id, updatePaymentInstallmentDto);
  }

  remove(id: number) {
    return this.paymentInstallmentsRepository.delete(id);
  }
}
