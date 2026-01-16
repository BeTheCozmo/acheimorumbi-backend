import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePartyFormDto } from './dto/create-party-form.dto';
import { UpdatePartyFormDto } from './dto/update-party-form.dto';
import { PartyFormsRepository } from './party-forms.repository';
import { PartyFormType } from './enums/party-form-type.enum';
import { CreateFormAttributeDto } from './dto/form-attribute.dto';
import { ContractsService } from '@modules/contracts/contracts.service';
import { ContractDto } from '@modules/contracts/dto/contract.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';

@Injectable()
export class PartyFormsService {
  constructor(
    private readonly partyFormsRepository: PartyFormsRepository,
    private readonly contractsService: ContractsService,
  ) {}

  create(createPartyFormDto: CreatePartyFormDto) {
    return this.partyFormsRepository.create(createPartyFormDto);
  }

  addAttributeToForm(attribute: CreateFormAttributeDto) {
    return this.partyFormsRepository.addAttributeToForm(attribute);
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
      const { data, total } = await this.partyFormsRepository.findAllFiltered(
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

    return this.partyFormsRepository.findAll();
  }

  findOne(type: PartyFormType) {
    return this.partyFormsRepository.findOne(type);
  }

  async findOneByCode(code: string) {
    const contract = await this.contractsService.getContractByCode(code);
    const partyFormType = this.getPartyFormTypeByCode(contract as unknown as ContractDto, code);
    const partyFormAndAttributes = await this.partyFormsRepository.findOne(partyFormType);
    const property = await this.contractsService.getPropertyByContractId(contract.id);
    return {
      ...partyFormAndAttributes,
      property,
      contract
    }
  }

  getPartyFormTypeByCode(contract: ContractDto, code: string): PartyFormType {
    let isAcquirer = false;
    if (contract.acquirerCode === code) isAcquirer = true;

    switch (contract.type) {
      case 'SALE': return isAcquirer ? PartyFormType.BUYERS : PartyFormType.SELLERS;
      case 'LEASE': return isAcquirer ? PartyFormType.TENANTS : PartyFormType.LANDLORDS;
      default: throw new HttpException('Invalid contract type', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(type: PartyFormType, updatePartyFormDto: UpdatePartyFormDto) {
    return this.partyFormsRepository.update(type, updatePartyFormDto);
  }

  remove(type: PartyFormType) {
    return this.partyFormsRepository.remove(type);
  }
}
