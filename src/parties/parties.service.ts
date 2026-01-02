import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { PartiesRepository } from './parties.repository';
import { ContractsService } from '@modules/contracts/contracts.service';
import { PartyType } from './dto/party-type.dto';
import { PropertiesService } from '@modules/properties/properties.service';
import { PaymentInstallmentsService } from '@modules/payment-installments/payment-installments.service';
import { CreatePaymentInstallmentDto } from '@modules/payment-installments/dto/create-payment-installment.dto';
import { PaymentInstallmentsType } from '@modules/payment-installments/enums/payment-installments-type.enum';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';

@Injectable()
export class PartiesService {
  constructor(
    private readonly partiesRepository: PartiesRepository,
    private readonly contractsService: ContractsService,
    private readonly propertiesService: PropertiesService,
    private readonly paymentInstallmentsService: PaymentInstallmentsService,
  ) {}
  async create(createPartyDto: CreatePartyDto) {
    console.log({createPartyDto: JSON.stringify(createPartyDto, null, 2)});
    const contract = await this.contractsService.getContractByCode(createPartyDto.code);
    if(!contract) throw new HttpException('contract not found', HttpStatus.NOT_FOUND);
    if(await this.findSubmitedFormByCode(createPartyDto.code)) throw new HttpException("formulário já foi submetido", HttpStatus.BAD_REQUEST);
    
    const partySubmited = await this.partiesRepository.create({
      code: createPartyDto.code,
      contractId: contract.id,
      type: contract.acquirerCode === createPartyDto.code ? PartyType.ACQUIRER : PartyType.OWNER,
      data: createPartyDto.data
    });
    

    await this.propertiesService.update(contract.propertyId, createPartyDto.property);
    await this.contractsService.update(contract.id, createPartyDto.contract);
    if (partySubmited.some(party => party.type === PartyType.ACQUIRER))
      await this.createInstallmentsBasedOnPartiesInputs(createPartyDto.data, contract.id);
    
    return partySubmited;
  }

  private async createInstallmentsBasedOnPartiesInputs(parties: any[], contractId: number) {
    const financementInstallments = parties
    .filter(party => !!party.financiamentoBancario && (party.financiamentoBancario === 'Sim'))
    .map(partiesThatWillFinance => ({
      value: partiesThatWillFinance?.financiamentoValor as string,
      type: PaymentInstallmentsType.FINANCEMENT as PaymentInstallmentsType
    }));

    const fgtsInstallments = parties
    .filter(party => !!party.fgts && (party.fgts === 'Sim'))
    .map(party => ({
      value: party.fgtsValor as string,
      type: PaymentInstallmentsType.FGTS as PaymentInstallmentsType,
    }));
    
    const installments = [...financementInstallments, ...fgtsInstallments];
    for(const installment of installments) {
      await this.paymentInstallmentsService.create({
        type: installment.type as PaymentInstallmentsType,
        value: parseFloat(installment.value),
        contractId,
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
      });
    }
  }

  private async findSubmitedFormByCode(code: string) {
    return await this.partiesRepository.findSubmitedFormByCode(code);
  }

  async findAll(filters?: Record<string, any>, limit?: number, offset?: number, page?: number): Promise<any[] | PaginatedResponse<any>> {
    const hasFilters = filters && Object.keys(filters).length > 0;
    const actualLimit = Number(limit) || 10;
    const actualOffset = page ? (Number(page) - 1) * actualLimit : (Number(offset) || 0);

    if (hasFilters || limit !== undefined || offset !== undefined || page !== undefined) {
      const { data, total } = await this.partiesRepository.findAllFiltered(filters || {}, actualLimit, actualOffset);

      return {
        data,
        total,
        limit: actualLimit,
        ...(page ? { page } : { offset: actualOffset })
      };
    }

    return await this.partiesRepository.findAll();
  }

  findOne(id: number) {
    return this.partiesRepository.findOne(id);
  }

  findManyByCode(code: string) {
    return this.partiesRepository.findManyByCode(code);
  }

  async update(id: number, updatePartyDto: UpdatePartyDto) {
    // return this.partiesRepository.update(id, updatePartyDto);
  }

  remove(id: number) {
    return this.partiesRepository.remove(id);
  }

  findManyByContractId(contractId: number) {
    return this.partiesRepository.findManyByContractId(contractId);
  }
}
