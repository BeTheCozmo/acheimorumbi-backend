import { Injectable } from '@nestjs/common';
import { CreatePaymentInstallmentDto } from './dto/create-payment-installment.dto';
import { UpdatePaymentInstallmentDto } from './dto/update-payment-installment.dto';
import { PaymentInstallmentsRepository } from './payment-installments.repository';
import { PaymentInstallmentsType } from './enums/payment-installments-type.enum';
import { Contract, PaymentInstallments, User } from '@prisma/client';
import { ContractDto } from '@modules/contracts/dto/contract.dto';
import { RealtorDto } from '@modules/contracts/dto/realtor.dto';

@Injectable()
export class PaymentInstallmentsService {
  constructor(
    private readonly paymentInstallmentsRepository: PaymentInstallmentsRepository,
  ) {}

  create(createPaymentInstallmentDto: CreatePaymentInstallmentDto) {
    return this.paymentInstallmentsRepository.create(createPaymentInstallmentDto);
  }

  async createMany(createPaymentInstallmentDtos: Omit<CreatePaymentInstallmentDto, 'contractId' | 'paidAt'>[], contractId: number) {
    for (const installment of createPaymentInstallmentDtos || []) {
      await this.create({
        ...installment,
        dueDate: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)),
        contractId,
        paidAt: null,
      });
    }
  }

  async createPresumableInstallments(contract: Contract, realtor: RealtorDto & {configurations: {name: string, value: string}[]}) {
    if(contract.type == "SALE") {
      let brokeragePercentage = Number(realtor.configurations.find(config => config.name === 'porcentagemCorretagem').value);
      brokeragePercentage += Number(realtor.configurations.find(config => config.name === 'porcentagemCaptacao').value);
      await this.create({
        contractId: contract.id,
        value: contract.value * (brokeragePercentage / 100),
        dueDate: new Date(),
        paid: false,
        paidAt: null,
        type: PaymentInstallmentsType.COMISSION,
        accountDigit: realtor.accountDigit,
        accountNumber: realtor.accountNumber,
        accountType: realtor.accountType,
        agency: realtor.agency,
        agencyDigit: realtor.agencyDigit,
        bankCode: realtor.bankCode,
        bankName: realtor.bankName,
      });
    }
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
