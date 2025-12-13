import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsRepository } from './permissions.repository';

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

  findAll() {
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
