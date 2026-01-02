import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesRepository } from './roles.repository';
import { PermissionsService } from 'src/permissions/permissions.service';
import { Permission } from '@prisma/client';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';

@Injectable()
export class RolesService {
  constructor(
    private readonly rolesRepository: RolesRepository,
    private readonly permissionsService: PermissionsService,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const { permissions: createRolePermissions } = createRoleDto;
    let permissions: Permission[] = [];

    for (let permissionName of createRolePermissions) {
      let permission: Permission | null;
      if ((permission = await this.permissionsService.findOne(permissionName)) && permission) {
        permissions.push(permission);
        continue;
      }
      throw new HttpException(`permissão ${permissionName} não existe`, HttpStatus.NOT_FOUND);
    }
    return await this.rolesRepository.create({
      name: createRoleDto.name,
      permissions: permissions.map(permission => permission.name),
    });
  }

  async findAll(filters?: Record<string, any>, limit?: number, offset?: number, page?: number): Promise<any[] | PaginatedResponse<any>> {
    const hasFilters = filters && Object.keys(filters).length > 0;
    const actualLimit = Number(limit) || 10;
    const actualOffset = page ? (Number(page) - 1) * actualLimit : (Number(offset) || 0);

    if (hasFilters || limit !== undefined || offset !== undefined || page !== undefined) {
      const { data, total } = await this.rolesRepository.findAllFiltered(filters || {}, actualLimit, actualOffset);

      return {
        data,
        total,
        limit: actualLimit,
        ...(page ? { page } : { offset: actualOffset })
      };
    }

    return this.rolesRepository.findAll();
  }

  findOne(name: string) {
    return this.rolesRepository.findOne(name);
  }

  findOneByName(name: string) {
    return this.rolesRepository.findOneByName(name);
  }

  update(name: string, updateRoleDto: UpdateRoleDto) {
    return this.rolesRepository.update(name, updateRoleDto);
  }

  remove(name: string) {
    return this.rolesRepository.remove(name);
  }

  async addPermissionToRole(name: string, permissionName: string) {
    const role = await this.findOne(name);
    if (!role) throw new HttpException(`cargo ${name} não encontrado`, HttpStatus.NOT_FOUND);

    if (role.permissions.some((permission: Permission & {_id: string}) => permission._id == permissionName)) {
      throw new HttpException(`permissão ${permissionName} já foi inserida`, HttpStatus.CONFLICT);
    }

    const permission = await this.permissionsService.findOne(permissionName);
    if (!permission) throw new HttpException(`permissão ${permissionName} não foi encontrada`, HttpStatus.NOT_FOUND);

    return this.rolesRepository.addPermissionToRole(name, permission.name);
  }

  async removePermissionFromRole(name: string, permissionName: string) {
    const role = await this.findOne(name);
    if (!role) throw new HttpException(`cargo ${name} não encontrado`, HttpStatus.NOT_FOUND);
    if (!role.permissions.some((permission: Permission & {_id: string}) => permission._id == permissionName)) {
      throw new HttpException(`permissão ${permissionName} não foi encontrada`, HttpStatus.NOT_FOUND);
    }
    return this.rolesRepository.removePermissionFromRole(name, permissionName);
  }
}
