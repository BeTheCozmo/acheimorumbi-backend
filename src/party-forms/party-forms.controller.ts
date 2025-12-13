import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PartyFormsService } from './party-forms.service';
import { CreatePartyFormDto } from './dto/create-party-form.dto';
import { UpdatePartyFormDto } from './dto/update-party-form.dto';
import { PartyFormType } from './enums/party-form-type.enum';
import { ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from '@modules/permissions/permissions.guard';
import { Validator } from '@modules/permissions/permissions.decorator';
import { permissionsValidator } from '@modules/permissions/validator/permissions.validator';
import { AuthGuard } from '@modules/auth/auth.guard';
import { CreateFormAttributeDto } from './dto/form-attribute.dto';

@ApiTags('Party Forms')
@Controller('party-forms')
export class PartyFormsController {
  constructor(private readonly partyFormsService: PartyFormsService) {}

  @Post()
  @UseGuards(AuthGuard, PermissionsGuard)
  @Validator(permissionsValidator({"party-forms": "id"}, ["create"]))
  create(@Body() createPartyFormDto: CreatePartyFormDto) {
    return this.partyFormsService.create(createPartyFormDto);
  }

  @Post('attributes')
  @UseGuards(AuthGuard, PermissionsGuard)
  @Validator(permissionsValidator({"party-forms-attributes": "id"}, ["create"]))
  addAttributeToForm(@Body() attribute: CreateFormAttributeDto) {
    return this.partyFormsService.addAttributeToForm(attribute);
  }

  @Get()
  @UseGuards(AuthGuard, PermissionsGuard)
  @Validator(permissionsValidator({"party-forms": "id"}, ['read']))
  findAll() {
    return this.partyFormsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: PartyFormType) {
    return this.partyFormsService.findOne(id);
  }

  @Get('code/:code')
  findOneByCode(@Param('code') code: string) {
    return this.partyFormsService.findOneByCode(code);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, PermissionsGuard)
  @Validator(permissionsValidator({"party-forms": "id"}, ["update"]))
  update(@Param('id') id: PartyFormType, @Body() updatePartyFormDto: UpdatePartyFormDto) {
    return this.partyFormsService.update(id, updatePartyFormDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, PermissionsGuard)
  @Validator(permissionsValidator({"party-forms": "id"}, ["delete"]))
  remove(@Param('id') id: PartyFormType) {
    return this.partyFormsService.remove(id);
  }
}
