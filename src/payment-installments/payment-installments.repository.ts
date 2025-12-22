import { PrismaService } from "@modules/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreatePaymentInstallmentDto } from "./dto/create-payment-installment.dto";
import { UpdatePaymentInstallmentDto } from "./dto/update-payment-installment.dto";

@Injectable()
export class PaymentInstallmentsRepository {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async create(data: CreatePaymentInstallmentDto) {
    try {
      return await this.prismaService.paymentInstallments.create({
        data
      });
    } catch (error) {
      console.log({ error });
      return null;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.paymentInstallments.findMany();
    } catch (error) {
      console.log({ error });
      return [];
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.paymentInstallments.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log({ error });
      return null;
    }
  }

  async update(id: number, data: UpdatePaymentInstallmentDto) {
    try {
      return this.prismaService.paymentInstallments.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      console.log({ error });
      return null;
    }
  }

  async delete(id: number) {
    try {
      return this.prismaService.paymentInstallments.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log({ error });
      return null;
    }
  }
}
