import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Validator } from 'src/permissions/permissions.decorator';
import { permissionsValidator } from 'src/permissions/validator/permissions.validator';
import { UpdatePasswordDto } from '../auth/dto/update-password.dto';

@ApiTags("Users")
@Controller('users')
@ApiBearerAuth()
@UseGuards(AuthGuard, PermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, description: 'User created successfully', type: UserDto })
  @Validator(permissionsValidator({users: "id"}, ['create']))
  create(@Body() createUserDto: CreateUserDto, @Request() req) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully', type: [UserDto] })
  @Validator(permissionsValidator({users: "id"}, ['read']))
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully', type: UserDto })
  @Validator(permissionsValidator({users: "id"}, ['read']))
  getProfile(@Request() req) {
    const customerId = req.user.id;
    return this.usersService.findOne(customerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully', type: UserDto })
  @Validator(permissionsValidator({users: "id"}, ['read']))
  findOne(@Param('id') id: string, @Request() req) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: UserDto })
  @Validator(permissionsValidator({users: "id"}, ['update']))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully', type: UserDto })
  @Validator(permissionsValidator({users: "id"}, ['delete']))
  remove(@Param('id') id: string, @Request() req) {
    return this.usersService.remove(+id);
  }

  @Patch(':id/roles/:rid')
  @ApiOperation({ summary: 'Change role of user' })
  @ApiResponse({ status: 200, description: 'Role changed successfully', type: UserDto })
  @Validator(permissionsValidator({users: "id", roles: "rid"}, ['update']))
  changeRoleOfUser(@Param('id') id: string, @Param('rid') roleId: string) {
    return this.usersService.changeRoleOfUser(+id, roleId);
  }

  @Post(':id/permissions/:permissionId')
  @ApiOperation({summary: "Add Permission to User"})
  @ApiResponse({status: 200, description: "Permission added to user successfully"})
  @Validator(permissionsValidator({users: "id", permissions: "permissionId"}, ['create']))
  addPermissionToUser(@Param('id') id: string, @Param('permissionId') permissionId: string) {
    return this.usersService.addPermissionToUser(+id, permissionId);
  }

  @Delete(':id/permissions/:permissionId')
  @ApiOperation({summary: "Remove Permission from User"})
  @ApiResponse({status: 200, description: "Permission removed from user successfully"})
  @Validator(permissionsValidator({users: "id", permissions: "permissionId"}, ['delete']))
  removePermissionFromUser(@Param('id') id: string, @Param('permissionId') permissionId: string) {
    return this.usersService.removePermissionFromUser(+id, permissionId);
  }
}
