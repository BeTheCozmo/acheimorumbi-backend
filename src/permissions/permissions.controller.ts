import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionDto } from './dto/permission.dto';
import { PermissionsGuard } from './permissions.guard';
import { Validator } from './permissions.decorator';
import { permissionsValidator } from './validator/permissions.validator';
import { FilterQueryDto } from 'src/common/dto/filter-query.dto';

@ApiTags("Permissions")
@Controller('permissions')
@UseGuards(AuthGuard, PermissionsGuard)
@ApiBearerAuth()
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a permission' })
  @ApiResponse({ status: 201, description: 'Permission created successfully', type: PermissionDto })
  @Validator(permissionsValidator({permissions: 'id'}, ['create']))
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all permissions' })
  @ApiResponse({ status: 200, description: 'Permissions retrieved successfully', type: [PermissionDto] })
  @Validator(permissionsValidator({permissions: 'id'}, ['read']))
  findAll(@Query() query: FilterQueryDto & Record<string, any>) {
    const { limit, offset, page, orderBy, order, ...filters } = query;
    return this.permissionsService.findAll(filters, limit, offset, page, orderBy, order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a permission' })
  @ApiResponse({ status: 200, description: 'Permission retrieved successfully', type: PermissionDto })
  @Validator(permissionsValidator({permissions: 'id'}, ['read']))
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a permission' })
  @ApiResponse({ status: 200, description: 'Permission updated successfully', type: PermissionDto })
  @Validator(permissionsValidator({permissions: 'id'}, ['update']))
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a permission' })
  @ApiResponse({ status: 200, description: 'Permission deleted successfully', type: PermissionDto })
  @Validator(permissionsValidator({permissions: 'id'}, ['delete']))
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(id);
  }
}
