import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ContractsRepository } from './contracts.repository';
import { CodeGeneratorService } from '@modules/code-generator/code-generator.service';
import { ChecklistTitlesService } from '@modules/checklist-titles/checklist-titles.service';
import { PartyFormType } from '@modules/party-forms/enums/party-form-type.enum';
import { Contract, Party, PartyInfo, PaymentInstallmentsType, Prisma } from '@prisma/client';
import { PropertiesService } from '@modules/properties/properties.service';
import { PartiesService } from '@modules/parties/parties.service';
import { ContractGeneratorService } from '@modules/contract-generator/contract-generator.service';
import { ContractContextService } from './contract-context.service';
import { FormattedPartiesDto, FormattedPartyDto } from './dto/formatted-parties.dto';
import { PaymentInstallmentsService } from '@modules/payment-installments/payment-installments.service';
import { PaymentInstallmentsDto } from './dto/payment-installments.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { ContractType } from './enums/contract-type';
import { ContractWithInstallments } from './dto/contract-with-installments.dto';
import { CreatePaymentInstallmentDto } from '@modules/payment-installments/dto/create-payment-installment.dto';

@Injectable()
export class ContractsService {
  constructor(
    @Inject(forwardRef(() => PartiesService)) private partiesService: PartiesService,
    private readonly contractsRepository: ContractsRepository,
    private readonly codeGeneratorService: CodeGeneratorService,
    private readonly checklistTitlesService: ChecklistTitlesService,
    private readonly propertiesService: PropertiesService,
    private readonly contractsGeneratorService: ContractGeneratorService,
    private readonly contractContextService: ContractContextService,
    private readonly paymentInstallmentsService: PaymentInstallmentsService,
  ) { }

  async create(createContractDto: CreateContractDto) {
    let acquirerCode = '';
    do acquirerCode = this.codeGeneratorService.generateRandomString(6, 'AC-');
    while (await this.contractsRepository.findOneByAcquirerCode(acquirerCode));

    let ownerCode = '';
    do ownerCode = this.codeGeneratorService.generateRandomString(6, 'OW-');
    while (await this.contractsRepository.findOneByOwnerCode(ownerCode));

    const contractCreated = await this.contractsRepository.create({
      ...createContractDto,
      acquirerCode,
      ownerCode,
    });

    await this.checklistTitlesService.createDefaultTitles(contractCreated.id);
    // await this.paymentInstallmentsService.createDefaultInstallments(contractCreated.id);
    await this.paymentInstallmentsService.createMany(createContractDto.paymentInstallments, contractCreated.id);
    await this.paymentInstallmentsService.createPresumableInstallments(contractCreated, contractCreated.realtors[0]);

    return contractCreated;
  }

  async findAll(
    filters?: Record<string, any>,
    limit?: number,
    offset?: number,
    page?: number,
    orderBy?: string,
    order?: 'asc' | 'desc'
  ): Promise<any[] | PaginatedResponse<any>> {
    const hasFilters = filters && Object.keys(filters).length > 0;
    const actualLimit = Number(limit) || 10;
    const actualOffset = page ? (Number(page) - 1) * actualLimit : (Number(offset) || 0);

    if (hasFilters || limit !== undefined || offset !== undefined || page !== undefined || orderBy !== undefined) {
      const { data, total } = await this.contractsRepository.findAllFiltered(
        filters || {},
        actualLimit,
        actualOffset,
        orderBy,
        order
      );

      return {
        data,
        total,
        limit: actualLimit,
        ...(page ? { page } : { offset: actualOffset })
      };
    }

    return this.contractsRepository.findAll();
  }

  async findOne(id: number) {
    const contract = await this.contractsRepository.findOne(id);
    if(!contract) return contract;

    await this.updateInstallments(contract as ContractWithInstallments);
    return contract;
  }

  private async updateInstallments(contract: ContractWithInstallments) {
    switch (contract.type) {
      case ContractType.SALE:
        await this.updateInstallmentsForSale(contract);
        break;
      case ContractType.LEASE:
        await this.updateInstallmentsForLease(contract);
        break;
      default:
        break;
    }
  }

  private async updateInstallmentsForSale(contract: ContractWithInstallments) {
    if(!contract?.paymentInstallments.length) return;
    const { paymentInstallments } = contract;
    for (const installment of paymentInstallments) {
      switch (installment.type) {
        case PaymentInstallmentsType.COMISSION:
          await this.fixComissionInstallment(contract, {...installment, paidAt: installment.paidAt ? new Date(installment.paidAt).toString() : undefined});
          break;
        default:
          break;
      }
    }
  }

  private async updateInstallmentsForLease(contract: ContractWithInstallments) {
    if(!contract?.paymentInstallments.length) return;
    const { paymentInstallments } = contract;
    for (const installment of paymentInstallments) {
      switch (installment.type) {
        case PaymentInstallmentsType.SIGNAL:
          break;
        default:
          break;
      }
    }
  }

  private async fixComissionInstallment(contract: ContractWithInstallments, installment: PaymentInstallmentsDto) {
    if(installment.type !== PaymentInstallmentsType.COMISSION) return;
    await this.paymentInstallmentsService.update(installment.id, {
      ...installment,
      value: contract.value * (contract.intermediationPercentage / 100),
      paidAt: installment.paidAt ? new Date (installment.paidAt) : undefined,
      type: installment.type
    });
  }

  update(id: number, updateContractDto: UpdateContractDto) {
    console.log({ updateContractDto })
    return this.contractsRepository.update(id, updateContractDto);
  }

  remove(id: number) {
    return this.contractsRepository.remove(id);
  }

  async getContractByCode(code: string) {
    const acquirer = await this.contractsRepository.findOneByAcquirerCode(code);
    if (acquirer) return acquirer;
    const owner = await this.contractsRepository.findOneByOwnerCode(code);
    if (owner) return owner;
    return null;
  }

  async getPropertyByContractId(id: number) {
    const contract = await this.findOne(id);
    return await this.propertiesService.findOne(contract.propertyId);
  }

  async generateFile(contract: Contract) {
    const property = await this.propertiesService.findOne(contract.propertyId);
    const {isPropertyFullFilled, fieldsNotFilled} = await this.propertiesService.checkPropertyFullFilled(contract.propertyId);
    console.log({ property, isPropertyFullFilled, fieldsNotFilled });
    if(!isPropertyFullFilled) throw new HttpException({property: fieldsNotFilled}, HttpStatus.FAILED_DEPENDENCY);
    const parties = await this.partiesService.findManyByContractId(contract.id);
    const formattedParties: FormattedPartiesDto = this.formatParties(parties);
    console.log({ formattedParties });
    const acquirers = formattedParties.filter(party => party.type === 'ACQUIRER');
    const owners = formattedParties.filter(party => party.type === 'OWNER');
    return this.contractsGeneratorService.create({
      acquirers,
      owners,
      property,
      contract,
      contractType: contract.type,
      ctx: this.contractContextService.generateAdditionalContext({
        contract,
        acquirers,
        owners,
        property,
      })
    });
  }

  private formatParties(parties: (Party & { data: PartyInfo[] })[]): FormattedPartiesDto {
    return parties.map(party => this.formatParty(party));
  }

  private formatParty(party: (Party & { data: PartyInfo[] })): FormattedPartyDto {
    return {
      ...Object.fromEntries(party.data.map(p => [p.key, p.value])),
      type: party.type
    }
  }

  async getPartyAttributes(code: string) {
    const party = await this.partiesService.findManyByCode(code);
    return this.formatParties(party);
  }
}
