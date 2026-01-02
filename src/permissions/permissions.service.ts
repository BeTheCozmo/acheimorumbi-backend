import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsRepository } from './permissions.repository';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';

@Injectable()
export class PermissionsService {

  constructor(
    private readonly permissionsRepository: PermissionsRepository,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    if(await this.existsPermissionWithName(createPermissionDto.name))
      throw new HttpException('permissão já existe', HttpStatus.CONFLICT);

    return this.permissionsRepository.create(createPermissionDto);
  }

  async existsPermissionWithName(name: string): Promise<boolean> {
    const permission = await this.findOneByName(name);
    return !!permission;
  }

  async findAll(filters?: Record<string, any>, limit?: number, offset?: number, page?: number): Promise<any[] | PaginatedResponse<any>> {
    const hasFilters = filters && Object.keys(filters).length > 0;
    const actualLimit = Number(limit) || 10;
    const actualOffset = page ? (Number(page) - 1) * actualLimit : (Number(offset) || 0);

    if (hasFilters || limit !== undefined || offset !== undefined || page !== undefined) {
      const { data, total } = await this.permissionsRepository.findAllFiltered(filters || {}, actualLimit, actualOffset);

      return {
        data,
        total,
        limit: actualLimit,
        ...(page ? { page } : { offset: actualOffset })
      };
    }

    return this.permissionsRepository.findAll();
  }

  findOne(id: string) {
    return this.permissionsRepository.findOne(id);
  }

  findOneByName(name: string) {
    return this.permissionsRepository.findByName(name);
  }

  update(id: string, updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsRepository.update(id, updatePermissionDto);
  }

  remove(id: string) {
    return this.permissionsRepository.remove(id);
  }
}
