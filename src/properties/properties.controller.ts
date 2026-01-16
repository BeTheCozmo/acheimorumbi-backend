import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Validator } from 'src/permissions/permissions.decorator';
import { permissionsValidator } from 'src/permissions/validator/permissions.validator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilterQueryDto } from 'src/common/dto/filter-query.dto';

@ApiTags('Properties')
@Controller('properties')
@UseGuards(AuthGuard, PermissionsGuard)
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @ApiOperation({summary: 'Create a new property'})
  @Validator(permissionsValidator({properties: 'id'}, ['create']))
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all properties'})
  @Validator(permissionsValidator({properties: 'id'}, ['read']))
  findAll(@Query() query: FilterQueryDto & Record<string, any>) {
    const { limit, offset, page, orderBy, order, ...filters } = query;
    return this.propertiesService.findAll(filters, limit, offset, page, orderBy, order);
  }

  @Get(':id')
  @ApiOperation({summary: 'Get a property by id'})
  @Validator(permissionsValidator({properties: 'id'}, ['read']))
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update a property by id'})
  @Validator(permissionsValidator({properties: 'id'}, ['update']))
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete a property by id'})
  @Validator(permissionsValidator({properties: 'id'}, ['delete']))
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }
}
