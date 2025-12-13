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
          value: createContractDto.value
        },
        include: {checklistTitles: {include: {checklistItems: true}}}
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.contract.findMany();
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
        include: {checklistTitles: {include: {checklistItems: true}}}
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
        include: {checklistTitles: {include: {checklistItems: true}}}
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
        include: {checklistTitles: {include: {checklistItems: true}}}
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    try {
      return await this.prismaService.contract.update({
        where: {
          id: id,
        },
        data: {
          ...updateContractDto,
        },
        include: {checklistTitles: {include: {checklistItems: true}}}
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
        include: {checklistTitles: {include: {checklistItems: true}}}
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }
}
