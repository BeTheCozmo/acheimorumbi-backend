import { Injectable } from '@nestjs/common';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from '@prisma/client';
import { buildPrismaWhere, removeMode } from "src/common/utils/prisma-filter.util";
import { PERMISSION_FILTER_CONFIG } from "./permissions.filter-config";

@Injectable()
export class PermissionsRepository {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  create(createPermissionsDto: CreatePermissionDto) {
    try {
      return this.prismaService.permission.create({
        data: createPermissionsDto,
      });
    } catch (error) {
      return null;
    }
  }

  findAll() {
    try {
      return this.prismaService.permission.findMany();
    } catch (error) {
      return [];
    }
  }

  async findAllFiltered(filters: Record<string, any>, limit: number, offset: number) {
    try {
      const where = buildPrismaWhere(filters, PERMISSION_FILTER_CONFIG);

      const [data, total] = await Promise.all([
        this.prismaService.permission.findMany({
          where,
          take: limit,
          skip: offset,
        }),
        this.prismaService.permission.count({
          where: removeMode(where)
        }),
      ]);

      return { data, total };
    } catch (error) {
      console.log({ error });
      return { data: [], total: 0 };
    }
  }

  findOne(name: string) {
    try {
      return this.prismaService.permission.findUnique({
        where: { name },
      });
    } catch (error) {
      return null;
    }
  }

  findByName(name: string) {
    try {
      return this.prismaService.permission.findUnique({
        where: { name },
      });
    } catch (error) {
      return null;
    }
  }

  update(name: string, updatePermissionsDto: UpdatePermissionDto) {
    try {
      return this.prismaService.permission.update({
        where: { name },
        data: updatePermissionsDto,
      });
    } catch (error) {
      return null;
    }
  }

  remove(name: string) {
    try {
      return this.prismaService.permission.delete({
        where: { name },
      });
    } catch (error) {
      return null;
    }
  }
}
