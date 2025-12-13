import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Validator } from 'src/permissions/permissions.decorator';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { permissionsValidator } from 'src/permissions/validator/permissions.validator';

@ApiTags('Roles')
@Controller('roles')
@UseGuards(AuthGuard, PermissionsGuard)
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({summary: "Create new role"})
  @ApiResponse({status: 201, description: "Role created sucessfully", type: CreateRoleDto})
  @Validator(permissionsValidator({roles: "id"}))
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({summary: "Get all Roles"})
  @ApiResponse({status: 200, description: "Roles response", type: [CreateRoleDto]})
  @Validator(permissionsValidator({roles: "id"}))
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: "Get role by ID"})
  @ApiResponse({status: 200, description: "Role got by ID", type: CreateRoleDto})
  @Validator(permissionsValidator({roles: "id"}))
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: "Update role"})
  @ApiResponse({status: 200, description: "Update role", type: UpdateRoleDto})
  @Validator(permissionsValidator({roles: "id"}))
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({summary: "Delete Role"})
  @ApiResponse({status: 200, description: "Role got by ID"})
  @Validator(permissionsValidator({roles: "id"}))
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }

  @Post(':id/permissions/:permissionId')
  @ApiOperation({summary: "Add Permission to Role"})
  @Validator(permissionsValidator({roles: "id", permissions: "permissionId"}))
  addPermissionToRole(@Param('id') id: string, @Param('permissionId') permissionId: string) {
    return this.rolesService.addPermissionToRole(id, permissionId);
  }

  @Delete(':id/permissions/:permissionId')
  @ApiOperation({summary: "Remove Permission from Role"})
  @Validator(permissionsValidator({roles: "id", permissions: "permissionId"}))
  removePermissionFromRole(@Param('id') id: string, @Param('permissionId') permissionId: string) {
    return this.rolesService.removePermissionFromRole(id, permissionId);
  }
}
