import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { buildPrismaWhere, removeMode } from "src/common/utils/prisma-filter.util";
import { USER_FILTER_CONFIG } from "./users.filter-config";

@Injectable()
export class UsersRepository {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }
  create(
    createUserDto: CreateUserDto,
  ) {
    try {
      return this.prismaService.user.create(
        {
          data: {
            ...createUserDto,
            configurations: {
              createMany: {
                data: [
                  { name: 'porcentagemCaptacao', value: "5" },
                  { name: 'porcentagemCorretagem', value: "40" },
                  ...createUserDto?.configurations || [],
                ],
              }
            }
          },
          include: {
            permissions: true,
            role: { include: { permissions: true } }
          }
        }
      );
    } catch (error) {
      console.log({ error });
      return null;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.user.findMany({
        include: {
          permissions: true,
          configurations: true,
          role: { include: { permissions: true }, },
        }
      });
    } catch (error) {
      return [];
    }
  }

  async findAllFiltered(filters: Record<string, any>, limit: number, offset: number) {
    try {
      const where = buildPrismaWhere(filters, USER_FILTER_CONFIG);

      const [data, total] = await Promise.all([
        this.prismaService.user.findMany({
          where,
          include: {
            permissions: true,
            configurations: true,
            role: { include: { permissions: true } },
          },
          take: limit,
          skip: offset,
        }),
        this.prismaService.user.count({
          where: removeMode(where)
        }),
      ]);

      return { data, total };
    } catch (error) {
      console.log({ error });
      return { data: [], total: 0 };
    }
  }

  findOne(id: number) {
    try {
      return this.prismaService.user.findUnique(
        {
          where: { id },
          include: {
            permissions: true,
            role: { include: { permissions: true } },
            configurations: true
          }
        }
      );
    } catch (error) {
      return null;
    }
  }

  findByEmail(email: string) {
    try {
      return this.prismaService.user.findUnique(
        {
          where: { email },
          include: { permissions: true, role: { include: { permissions: true } } }
        });
    } catch (error) {
      return null;
    }
  }

  async update(id: number, updateCustomerDto: Partial<CreateUserDto>) {
    try {
      const existingConfigurations = updateCustomerDto.configurations?.filter(config => config.id) || [];
      const newConfigurations = updateCustomerDto.configurations?.filter(config => !config.id) || [];
      const idsToKeep = existingConfigurations.map(config => config.id);
      return await this.prismaService.user.update({
        where: { id },
        data: {
          ...updateCustomerDto,
          configurations: {
            deleteMany: {
              id: { notIn: idsToKeep }
            },
            update: existingConfigurations.map(config => ({
              where: { id: config.id },
              data: {
                ...config,
              }
            })),
            create: newConfigurations.map(config => ({
              ...config,
            }))
          }
        },
        include: { permissions: true, role: { include: { permissions: true } } }
      });
    } catch (error) {
      return null;
    }
  }

  updatePassword(userId: number, newPassword: string) {
    try {
      return this.prismaService.user.update({
        where: { id: userId },
        data: { password: newPassword },
        include: { permissions: true, role: { include: { permissions: true } } }
      });
    } catch (error) {
      return null;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.user.delete(
        {
          where: { id },
          include: { permissions: true, role: { include: { permissions: true } } }
        }
      );
    } catch (error) {
      console.log({ error })
      return null;
    }
  }

  async changeRoleOfUser(id: number, roleId: string) {
    try {
      return await this.prismaService.user.update({
        where: { id },
        data: { roleId: roleId },
        include: { permissions: true, role: { include: { permissions: true } } }
      });
    } catch (error) {
      return null;
    }
  }

  async addPermissionToUser(id: number, permissionName: string) {
    try {
      return await this.prismaService.user.update({
        where: { id },
        data: { permissions: { connect: { name: permissionName } } },
        include: { permissions: true, role: { include: { permissions: true } } }
      });
    } catch (error) {
      return null;
    }
  }

  async removePermissionFromUser(id: number, permissionName: string) {
    try {
      return await this.prismaService.user.update({
        where: { id },
        data: { permissions: { disconnect: { name: permissionName } } },
        include: { permissions: true, role: { include: { permissions: true } } }
      });
    } catch (error) {
      return null;
    }
  }
}