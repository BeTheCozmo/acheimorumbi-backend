import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { AuthGuard } from '@modules/auth/auth.guard';
import { PermissionsGuard } from '@modules/permissions/permissions.guard';
import { Validator } from '@modules/permissions/permissions.decorator';
import { permissionsValidator } from '@modules/permissions/validator/permissions.validator';
import { FilterQueryDto } from 'src/common/dto/filter-query.dto';

@Controller('configurations')
@UseGuards(AuthGuard, PermissionsGuard)
export class ConfigurationsController {
  constructor(private readonly configurationsService: ConfigurationsService) {}

  @Post()
  @Validator(permissionsValidator({configurations: "name"}, ["create"]))
  create(@Body() createConfigurationDto: CreateConfigurationDto) {
    return this.configurationsService.create(createConfigurationDto);
  }

  @Get()
  @Validator(permissionsValidator({configurations: "name"}, ["read"]))
  findAll(@Query() query: FilterQueryDto & Record<string, any>) {
    const { limit, offset, page, orderBy, order, ...filters } = query;
    return this.configurationsService.findAll(filters, limit, offset, page, orderBy, order);
  }

  @Get(':name')
  @Validator(permissionsValidator({configurations: "name"}, ["read"]))
  findOne(@Param('name') name: string) {
    return this.configurationsService.findOne(name);
  }

  @Patch(':name')
  @Validator(permissionsValidator({configurations: "name"}, ["update"]))
  update(@Param('name') name: string, @Body() updateConfigurationDto: UpdateConfigurationDto) {
    return this.configurationsService.update(name, updateConfigurationDto);
  }

  @Delete(':name')
  @Validator(permissionsValidator({configurations: "name"}, ["delete"]))
  remove(@Param('name') name: string) {
    return this.configurationsService.remove(name);
  }
}
