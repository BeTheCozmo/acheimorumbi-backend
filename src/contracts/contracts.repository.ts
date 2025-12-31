import { PrismaService } from "@modules/prisma/prisma.service";
import { Inject, Injectable } from "@nestjs/common";
import { CreateContractDto } from "./dto/create-contract.dto";
import { UpdateContractDto } from "./dto/update-contract.dto";
import { ContractStatus } from "./enums/contract-status";

@Injectable()
export class ContractsRepository {
  @Inject() prismaService: PrismaService;


  async create(createContractDto: CreateContractDto) {
    try {
      return await this.prismaService.contract.create({
        data: {
          propertyId: createContractDto.propertyId,
          type: createContractDto.type,
          status: ContractStatus.PENDING,
          acquirerCode: createContractDto.acquirerCode,
          ownerCode: createContractDto.ownerCode,
          value: createContractDto.value,
          ...createContractDto,
          realtors: createContractDto.realtors ? {connect: createContractDto?.realtors.map(id => ({id}))} : undefined,
          paymentInstallments: createContractDto.paymentInstallments ? {create: createContractDto.paymentInstallments} : undefined,
          witnesses: createContractDto.witnesses ? {connect: createContractDto.witnesses.map(id => ({id}))} : undefined,
        },
        include: {checklistTitles: {include: {checklistItems: true}}, realtors: {omit: {password: true}, include: {configurations: true}}, paymentInstallments: true, witnesses: true}
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.contract.findMany({
        include: {
          realtors: true,
          paymentInstallments: true,
          witnesses: true,
        }
      });
    } catch (error) {
      console.log({error});
      return [];
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.contract.findFirst({
        where: {
          id: id,
        },
        include: {
          checklistTitles: {include: {checklistItems: true}}, 
          realtors: {omit: {password: true}},
          paymentInstallments: true,
          witnesses: true,
        }
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async findOneByAcquirerCode(code: string) {
    try {
      return await this.prismaService.contract.findFirst({
        where: {
          acquirerCode: code,
        },
        include: {checklistTitles: {include: {checklistItems: true}}, realtors: {omit: {password: true}}, witnesses: true}
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async findOneByOwnerCode(code: string) {
    try {
      return await this.prismaService.contract.findFirst({
        where: {
          ownerCode: code,
        },
        include: {checklistTitles: {include: {checklistItems: true}}, realtors: {omit: {password: true}}, witnesses: true}
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    try {
      // Separar installments existentes (com id) dos novos (sem id)
      const existingInstallments = updateContractDto.paymentInstallments?.filter(p => p.id) || [];
      const newInstallments = updateContractDto.paymentInstallments?.filter(p => !p.id) || [];

      // IDs dos installments que devem permanecer
      const idsToKeep = existingInstallments.map(p => p.id);

      return await this.prismaService.contract.update({
        where: {
          id: id,
        },
        data: {
          ...updateContractDto,
          propertyId: updateContractDto.propertyId || undefined,
          realtors: updateContractDto.realtors ? {set: updateContractDto?.realtors.map(id => ({id}))} : undefined,
          paymentInstallments: {
            // Deletar installments que não estão mais no array
            deleteMany: {
              contractId: id,
              id: { notIn: idsToKeep }
            },
            // Atualizar installments existentes
            update: existingInstallments.map(installment => ({
              where: { id: installment.id },
              data: {
                type: installment.type,
                value: installment.value,
                dueDate: installment.dueDate,
                paid: installment.paid,
                paidAt: installment.paidAt,
                bankName: installment.bankName,
                bankCode: installment.bankCode,
                agency: installment.agency,
                agencyDigit: installment.agencyDigit,
                accountNumber: installment.accountNumber,
                accountDigit: installment.accountDigit,
                accountType: installment.accountType,
              }
            })),
            // Criar novos installments
            create: newInstallments.map(installment => ({
              type: installment.type,
              value: installment.value,
              dueDate: installment.dueDate,
              paid: installment.paid,
              paidAt: installment.paidAt,
              bankName: installment.bankName,
              bankCode: installment.bankCode,
              agency: installment.agency,
              agencyDigit: installment.agencyDigit,
              accountNumber: installment.accountNumber,
              accountDigit: installment.accountDigit,
              accountType: installment.accountType,
            }))
          },
          witnesses: updateContractDto.witnesses ? {connect: updateContractDto?.witnesses.map(id => ({id}))} : undefined,
        },
        include: {checklistTitles: {include: {checklistItems: true}}, realtors: {omit: {password: true}}, paymentInstallments: true, witnesses: true}
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.contract.delete({
        where: {
          id: id,
        },
        include: {checklistTitles: {include: {checklistItems: true}}, realtors: {omit: {password: true}}, paymentInstallments: true, witnesses: true}
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }
}
