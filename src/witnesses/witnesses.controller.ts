import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { WitnessesService } from './witnesses.service';
import { CreateWitnessDto } from './dto/create-witness.dto';
import { UpdateWitnessDto } from './dto/update-witness.dto';
import { FilterQueryDto } from 'src/common/dto/filter-query.dto';
import { AuthGuard } from '@modules/auth/auth.guard';
import { PermissionsGuard } from '@modules/permissions/permissions.guard';
import { Validator } from '@modules/permissions/permissions.decorator';
import { permissionsValidator } from '@modules/permissions/validator/permissions.validator';

@Controller('witnesses')
@UseGuards(AuthGuard, PermissionsGuard)
export class WitnessesController {
  constructor(private readonly witnessesService: WitnessesService) {}

  @Post()
  @Validator(permissionsValidator({witnesses: 'id'}, ['create']))
  create(@Body() createWitnessDto: CreateWitnessDto) {
    return this.witnessesService.create(createWitnessDto);
  }

  @Get()
  @Validator(permissionsValidator({witnesses: 'id'}, ['read']))
  findAll(@Query() query: FilterQueryDto & Record<string, any>) {
    const { limit, offset, page, orderBy, order, ...filters } = query;
    return this.witnessesService.findAll(filters, limit, offset, page, orderBy, order);
  }

  @Get(':id')
  @Validator(permissionsValidator({witnesses: 'id'}, ['read']))
  findOne(@Param('id') id: string) {
    return this.witnessesService.findOne(+id);
  }

  @Patch(':id')
  @Validator(permissionsValidator({witnesses: 'id'}, ['update']))
  update(@Param('id') id: string, @Body() updateWitnessDto: UpdateWitnessDto) {
    return this.witnessesService.update(+id, updateWitnessDto);
  }

  @Delete(':id')
  @Validator(permissionsValidator({witnesses: 'id'}, ['delete']))
  remove(@Param('id') id: string) {
    return this.witnessesService.remove(+id);
  }
}
