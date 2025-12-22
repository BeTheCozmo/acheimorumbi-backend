import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }
  create(createUserDto: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      return this.prismaService.user.create(
        {
          data: createUserDto,
          include: {
            permissions: true,
            role: { include: { permissions: true } }
          }
        }
      );
    } catch (error) {
      return null;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.user.findMany({
        include: { permissions: true, role: { include: { permissions: true } } }
      });
    } catch (error) {
      return [];
    }
  }

  findOne(id: number) {
    try {
      return this.prismaService.user.findUnique(
        {
          where: { id },
          include: { permissions: true, role: { include: { permissions: true } } }
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

  async update(id: number, updateCustomerDto: UpdateUserDto) {
    try {
      return await this.prismaService.user.update({
        where: { id },
        data: updateCustomerDto,
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