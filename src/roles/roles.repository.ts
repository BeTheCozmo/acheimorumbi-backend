import { Injectable } from '@nestjs/common';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Permission, Prisma, Role } from '@prisma/client';
import { buildPrismaWhere, removeMode } from "src/common/utils/prisma-filter.util";
import { ROLE_FILTER_CONFIG } from "./roles.filter-config";

@Injectable()
export class RolesRepository {
  constructor(
    private prismaService: PrismaService,
  ) {}

  create(createRolesDto: CreateRoleDto) {
    try {
      return this.prismaService.role.create({
        data: {
          ...createRolesDto,
          permissions: {
            connect: createRolesDto.permissions.map((permission) => ({
              name: permission,
            })),
          },
        },
        include: { permissions: true },
      });
    } catch (error) {
      return null;
    }
  }

  findAll() {
    try {
      return this.prismaService.role.findMany({
        include: { permissions: true },
      });
    } catch (error) {
      return [];
    }
  }

  async findAllFiltered(filters: Record<string, any>, limit: number, offset: number) {
    try {
      const where = buildPrismaWhere(filters, ROLE_FILTER_CONFIG);

      const [data, total] = await Promise.all([
        this.prismaService.role.findMany({
          where,
          include: { permissions: true },
          take: limit,
          skip: offset,
        }),
        this.prismaService.role.count({
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
      return this.prismaService.role.findUnique({
        where: { name },
        include: { permissions: true },
      });
    } catch (error) {
      return null;
    }
  }

  findOneByName(name: string) {
    try {
      return this.prismaService.role.findUnique({
        where: { name },
        include: { permissions: true },
      });
    } catch (error) {
      return null;
    }
  }

  update(name: string, updateRolesDto: UpdateRoleDto) {
    try {
      return this.prismaService.role.update({
        where: { name },
        data: {
          ...updateRolesDto,
          permissions: {
            connect: updateRolesDto.permissions.map((permission) => ({
              name: permission,
            })),
          },
        },
        include: { permissions: true },
      });
    } catch (error) {
      return null;
    }
  }

  remove(name: string) {
    try {
      return this.prismaService.role.delete({
        where: { name },
      });
    } catch (error) {
      return null;
    }
  }

  async addPermissionToRole(name: string, permissionName: string) {
    try {
      return await this.prismaService.role.update({
        where: { name },
        data: { permissions: { connect: { name: permissionName } } },
        include: { permissions: true },
      });
    } catch (error) {
      return null;
    }
  }

  async removePermissionFromRole(name: string, permissionName: string) {
    try {
      return await this.prismaService.role.update({
        where: { name },
        data: { permissions: { disconnect: { name: permissionName } } },
        include: { permissions: true },
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }
}