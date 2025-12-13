import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { PartiesRepository } from './parties.repository';
import { Prisma } from '@prisma/client';
import { ContractsService } from '@modules/contracts/contracts.service';
import { PartyType } from './dto/party-type.dto';

@Injectable()
export class PartiesService {
  constructor(
    private readonly partiesRepository: PartiesRepository,
    private readonly contractsService: ContractsService
  ) {}
  async create(createPartyDto: CreatePartyDto) {
    console.log({createPartyDto: JSON.stringify(createPartyDto, null, 2)});
    const contract = await this.contractsService.getContractByCode(createPartyDto.code);
    if(!contract) throw new HttpException('contract not found', HttpStatus.NOT_FOUND);
    if(await this.findSubmitedFormByCode(createPartyDto.code)) throw new HttpException("formulário já foi submetido", HttpStatus.BAD_REQUEST);
    
    return await this.partiesRepository.create({
      code: createPartyDto.code,
      contractId: contract.id,
      type: contract.acquirerCode === createPartyDto.code ? PartyType.ACQUIRER : PartyType.OWNER,
      data: createPartyDto.data
    });
  }

  private async findSubmitedFormByCode(code: string) {
    return await this.partiesRepository.findSubmitedFormByCode(code);
  }

  async findAll() {
    return await this.partiesRepository.findAll();
  }

  findOne(id: number) {
    return this.partiesRepository.findOne(id);
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
