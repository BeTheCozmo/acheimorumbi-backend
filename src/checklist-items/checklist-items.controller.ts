import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ChecklistItemsService } from './checklist-items.service';
import { CreateChecklistItemDto } from './dto/create-checklist-item.dto';
import { UpdateChecklistItemDto } from './dto/update-checklist-item.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Validator } from '@modules/permissions/permissions.decorator';
import { permissionsValidator } from '@modules/permissions/validator/permissions.validator';
import { AuthGuard } from '@modules/auth/auth.guard';
import { PermissionsGuard } from '@modules/permissions/permissions.guard';
import { FilterQueryDto } from 'src/common/dto/filter-query.dto';

@Controller('contracts/:id/checklist-items')
@UseGuards(AuthGuard, PermissionsGuard)
export class ChecklistItemsController {
  constructor(private readonly checklistItemsService: ChecklistItemsService) {}

  // @Post()
  // create(@Body() createChecklistItemDto: CreateChecklistItemDto) {
  //   return this.checklistItemsService.create(createChecklistItemDto);
  // }

  @Get()
  @ApiOperation({ summary: 'Get all checklist items' })
  @Validator(permissionsValidator({contracts: "id", 'checklist-items': "ciid"}, ["read"]))
  findAll(@Query() query: FilterQueryDto & Record<string, any>) {
    const { limit, offset, page, ...filters } = query;
    return this.checklistItemsService.findAll(filters, limit, offset, page);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.checklistItemsService.findOne(+id);
  // }

  @Patch(':ciid')
  @ApiOperation({ summary: 'Toggle checked' })
  @Validator(permissionsValidator({contracts: "id", 'checklist-items': "ciid"}, ["update"]))
  update(@Param('ciid') ciid: string) {
    return this.checklistItemsService.toggleChecked(+ciid);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.checklistItemsService.remove(+id);
  // }
}
