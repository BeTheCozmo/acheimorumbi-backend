import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, StreamableFile, Query } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { AuthGuard } from '@modules/auth/auth.guard';
import { PermissionsGuard } from '@modules/permissions/permissions.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContractDto } from './dto/contract.dto';
import { Validator } from '@modules/permissions/permissions.decorator';
import { permissionsValidator } from '@modules/permissions/validator/permissions.validator';
import { FilterQueryDto } from 'src/common/dto/filter-query.dto';

@ApiTags("Contracts")
@Controller('contracts')
@UseGuards(AuthGuard, PermissionsGuard)
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  @ApiOperation({ summary: "Create contract" })
  @ApiResponse({ type: ContractDto })
  @Validator(permissionsValidator({contracts: "id"}, ["create"]))
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractsService.create(createContractDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all contracts" })
  @ApiResponse({ type: ContractDto, isArray: true })
  @Validator(permissionsValidator({contracts: "id"}, ["read"]))
  findAll(@Query() query: FilterQueryDto & Record<string, any>) {
    const { limit, offset, page, ...filters } = query;
    return this.contractsService.findAll(filters, limit, offset, page);
  }

  @Get(':id')
  @ApiOperation({ summary: "Get contract by id" })
  @ApiResponse({ type: ContractDto })
  @Validator(permissionsValidator({contracts: "id"}, ["read"]))
  findOne(@Param('id') id: string) {
    return this.contractsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update contract" })
  @ApiResponse({ type: ContractDto })
  @Validator(permissionsValidator({contracts: "id"}, ["update"]))
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return this.contractsService.update(+id, updateContractDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Delete contract" })
  @ApiResponse({ type: ContractDto })
  @Validator(permissionsValidator({contracts: "id"}, ["delete"]))
  remove(@Param('id') id: string) {
    return this.contractsService.remove(+id);
  }

  @Get(':id/file')
  @ApiOperation({ summary: "Get contract file" })
  @Validator(permissionsValidator({contracts: "id"}, ["read"]))
  async getContractFile(@Param('id') id: string) {
    console.log({id});
    const contract = await this.contractsService.findOne(+id);
    console.log({contract});
    const fileBuffer = await this.contractsService.generateFile(contract);
    return new StreamableFile(fileBuffer, {disposition: 'attachment'})
  }

  @Get(":id/:code/attributes")
  @ApiOperation({ summary: "Get Party Attributes By Code" })
  @Validator(permissionsValidator({contracts: "id"}, ["read"]))
  getContractPartyAttributes(
    @Param('id') id: string,
    @Param('code') code: string,
  ) {
    return this.contractsService.getPartyAttributes(code);
  }
}
