import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@modules/auth/auth.guard';
import { PermissionsGuard } from '@modules/permissions/permissions.guard';
import { Validator } from '@modules/permissions/permissions.decorator';
import { permissionsValidator } from '@modules/permissions/validator/permissions.validator';

@ApiTags('Parties')
@Controller('contracts/:id/parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new party' })
  @UseGuards(AuthGuard, PermissionsGuard)
  @Validator(permissionsValidator({contracts: "id", parties: "pid"}))
  create(@Body() createPartyDto: CreatePartyDto) {
    return this.partiesService.create(createPartyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all parties' })
  @UseGuards(AuthGuard, PermissionsGuard)
  @Validator(permissionsValidator({contracts: "id", parties: "pid"}))
  findAll() {
    return this.partiesService.findAll();
  }

  @Get(':pid')
  @ApiOperation({ summary: 'Get a party by id' })
  @UseGuards(AuthGuard, PermissionsGuard)
  @Validator(permissionsValidator({contracts: "id", parties: "pid"}))
  findOne(@Param('pid') id: string) {
    return this.partiesService.findOne(+id);
  }

  @Patch(':pid')
  @ApiOperation({ summary: 'Update a party by id' })
  @UseGuards(AuthGuard, PermissionsGuard)
  @Validator(permissionsValidator({contracts: "id", parties: "pid"}))
  update(@Param('pid') id: string, @Body() updatePartyDto: UpdatePartyDto) {
    return this.partiesService.update(+id, updatePartyDto);
  }

  @Delete(':pid')
  @ApiOperation({ summary: 'Delete a party by id' })
  @UseGuards(AuthGuard, PermissionsGuard)
  @Validator(permissionsValidator({contracts: "id", parties: "pid"}))
  remove(@Param('pid') id: string) {
    return this.partiesService.remove(+id);
  }

  @Get(':pid/submited')
  @ApiOperation({ summary: 'Get a party submited status by id' })
  @UseGuards(AuthGuard, PermissionsGuard)
  @Validator(permissionsValidator({contracts: "id", parties: "pid"}))
  getSubmited(@Param('pid') id: string) {
    return this.partiesService.getSubmited(+id);
  }
}
