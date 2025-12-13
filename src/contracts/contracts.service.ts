import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ContractsRepository } from './contracts.repository';
import { CodeGeneratorService } from '@modules/code-generator/code-generator.service';
import { ChecklistTitlesService } from '@modules/checklist-titles/checklist-titles.service';
import { PartyFormType } from '@modules/party-forms/enums/party-form-type.enum';
import { Contract } from '@prisma/client';
import { PropertiesService } from '@modules/properties/properties.service';
import { PartiesService } from '@modules/parties/parties.service';
import { ContractGeneratorService } from '@modules/contract-generator/contract-generator.service';

@Injectable()
export class ContractsService {
  constructor(
    private readonly contractsRepository: ContractsRepository,
    private readonly codeGeneratorService: CodeGeneratorService,
    private readonly checklistTitlesService: ChecklistTitlesService,
    private readonly propertiesService: PropertiesService,
    private readonly partiesService: PartiesService,
    private readonly contractsGeneratorService: ContractGeneratorService,
    private readonly contractContextService: ContractContextService,
  ) {}

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
    
    return contractCreated;
  }

  findAll() {
    return this.contractsRepository.findAll();
  }

  findOne(id: number) {
    return this.contractsRepository.findOne(id);
  }

  update(id: number, updateContractDto: UpdateContractDto) {
    console.log({updateContractDto})
    return this.contractsRepository.update(id, updateContractDto);
  }

  remove(id: number) {
    return this.contractsRepository.remove(id);
  }

  async getContractByCode(code: string) {
    const acquirer = await this.contractsRepository.findOneByAcquirerCode(code);
    if(acquirer) return acquirer;
    const owner = await this.contractsRepository.findOneByOwnerCode(code);
    if(owner) return owner;
    return null;
  }

  async generateFile(contract: Contract) {
    const property = await this.propertiesService.findOne(contract.propertyId);
    const parties = await this.partiesService.findManyByContractId(contract.id);
    const acquirers = parties.filter(party => party.type === 'ACQUIRER');
    const owners = parties.filter(party => party.type === 'OWNER');
    return this.contractsGeneratorService.create({
      acquirers,
      owners,
      property,
      contractType: contract.type,
      ctx: this.contractContextService.generateAdditionalContext({
        contract,
        acquirers,
        owners,
        property,
      })
    });
  }
}
