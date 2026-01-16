import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Validator } from 'src/permissions/permissions.decorator';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { permissionsValidator } from 'src/permissions/validator/permissions.validator';
import { FilterQueryDto } from 'src/common/dto/filter-query.dto';

@ApiTags('Roles')
@Controller('roles')
@UseGuards(AuthGuard, PermissionsGuard)
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({summary: "Create new role"})
  @ApiResponse({status: 201, description: "Role created sucessfully", type: CreateRoleDto})
  @Validator(permissionsValidator({roles: "id"}, ['create']))
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({summary: "Get all Roles"})
  @ApiResponse({status: 200, description: "Roles response", type: [CreateRoleDto]})
  @Validator(permissionsValidator({roles: "id"}, ['read']))
  findAll(@Query() query: FilterQueryDto & Record<string, any>) {
    const { limit, offset, page, orderBy, order, ...filters } = query;
    return this.rolesService.findAll(filters, limit, offset, page, orderBy, order);
  }

  @Get(':id')
  @ApiOperation({summary: "Get role by ID"})
  @ApiResponse({status: 200, description: "Role got by ID", type: CreateRoleDto})
  @Validator(permissionsValidator({roles: "id"}, ['read']))
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: "Update role"})
  @ApiResponse({status: 200, description: "Update role", type: UpdateRoleDto})
  @Validator(permissionsValidator({roles: "id"}, ['update']))
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({summary: "Delete Role"})
  @ApiResponse({status: 200, description: "Role got by ID"})
  @Validator(permissionsValidator({roles: "id"}, ['delete']))
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }

  @Post(':id/permissions/:permissionId')
  @ApiOperation({summary: "Add Permission to Role"})
  @Validator(permissionsValidator({roles: "id", permissions: "permissionId"}, ['create']))
  addPermissionToRole(@Param('id') id: string, @Param('permissionId') permissionId: string) {
    return this.rolesService.addPermissionToRole(id, permissionId);
  }

  @Delete(':id/permissions/:permissionId')
  @ApiOperation({summary: "Remove Permission from Role"})
  @Validator(permissionsValidator({roles: "id", permissions: "permissionId"}, ['delete']))
  removePermissionFromRole(@Param('id') id: string, @Param('permissionId') permissionId: string) {
    return this.rolesService.removePermissionFromRole(id, permissionId);
  }
}
