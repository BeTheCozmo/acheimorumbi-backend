import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { RolesService } from 'src/roles/roles.service';
import { RolesEnum } from 'src/roles/enums/roles.enum';
import { PermissionsService } from 'src/permissions/permissions.service';
import { CreateUserByAuthDto } from './dto/create-user-auth.dto';
import { CodeGeneratorService } from '@modules/code-generator/code-generator.service';
import { UsersMailer } from './users.mailer';
import { UpdatePasswordDto } from '../auth/dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly configService: ConfigService,
    private readonly rolesService: RolesService,
    private readonly permissionsService: PermissionsService,
    private readonly codeGeneratorService: CodeGeneratorService,
    private readonly usersMailer: UsersMailer,
  ) {}

  async createByAuth(createUserDto: CreateUserByAuthDto) {
    if (await this.alreadyExistsByEmail(createUserDto.email))
      throw new HttpException(`user com email ${createUserDto.email} já existe`, HttpStatus.CONFLICT);

    const saltRounds = parseInt(this.configService.get<string>('BCRYPT_SALT_ROUNDS') || '13', 10);
    const role = await this.rolesService.findOne(createUserDto.roleId);
    if (!role) throw new HttpException(`cargo ${createUserDto.roleId} não encontrado`, HttpStatus.NOT_FOUND);
    const createdUser = await this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, saltRounds),
      roleId: RolesEnum.USER,
      bankCode: null,
      agency: null,
      agencyDigit: null,
      accountNumber: null,
      accountDigit: null,
      accountType: null,
      bankName: null,
    });
    if (!createdUser) throw new HttpException(`Erro ao criar usuário`, HttpStatus.INTERNAL_SERVER_ERROR);
    createdUser.password = undefined as unknown as string;
    return createdUser;
  }

  async create(createUserDto: CreateUserDto) {
    if (await this.alreadyExistsByEmail(createUserDto.email))
      throw new HttpException(`usuario com email ${createUserDto.email} já existe`, HttpStatus.CONFLICT);

    const saltRounds = parseInt(this.configService.get<string>('BCRYPT_SALT_ROUNDS') || '13', 10);
    const role = await this.rolesService.findOne(createUserDto.roleId);
    if (!role) throw new HttpException(`cargo ${createUserDto.roleId} não encontrado`, HttpStatus.NOT_FOUND);
    const password = this.codeGeneratorService.generateRandomString(12);
    const createdUser = await this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(password, saltRounds),
      roleId: RolesEnum.USER,
    });
    if (!createdUser) throw new HttpException(`Erro ao criar usuário`, HttpStatus.INTERNAL_SERVER_ERROR);

    try {
      await this.notifyUserCreated({
        name: createdUser.name,
        email: createdUser.email,
        password: password,
      });
    } catch (error) {
      console.log({error});
    }

    createdUser.password = undefined as unknown as string;
    return createdUser;
  }
  private async notifyUserCreated(data: {name: string, email: string, password: string}) {
    return await this.usersMailer.notifyUserCreated(data);
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    if(!users) return [];

    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      // type: user.type,
      permissions: user.permissions,
      role: user.role,
      configurations: user.configurations
    }));
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if(!user) throw new HttpException(`user ${id} não encontrado`, HttpStatus.NOT_FOUND);
    
    user.password = undefined as unknown as string;
    return user;
  }

  findOneWithPassword(id: number) {
    return this.userRepository.findOne(id);
  }

  async alreadyExistsByEmail(email: string) { return !!await this.findByEmail(email); }
  async findByEmail(email: string) { return await this.userRepository.findByEmail(email); }
  update(id: number, updateCustomerDto: UpdateUserDto) { return this.userRepository.update(id, updateCustomerDto); }
  remove(id: number) { return this.userRepository.remove(id); }

  async updatePassword(userId: number, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.findOneWithPassword(userId);
    if(!user) throw new HttpException(`usuário ${userId} não encontrado`, HttpStatus.NOT_FOUND);

    const isValidPassword = await bcrypt.compare(updatePasswordDto.oldPassword, user.password);
    if(!isValidPassword) throw new HttpException('senha antiga não corresponde com a atual', HttpStatus.UNAUTHORIZED);
    const saltRounds = parseInt(this.configService.get<string>('BCRYPT_SALT_ROUNDS') || '13', 10);
    return this.userRepository.updatePassword(userId, await bcrypt.hash(updatePasswordDto.newPassword, saltRounds));
  }

  async updatePasswordWithoutOldPassword(userId: number, newPassword: string) {
    const user = await this.findOneWithPassword(userId);
    if(!user) throw new HttpException(`usuário ${userId} não encontrado`, HttpStatus.NOT_FOUND);

    const saltRounds = parseInt(this.configService.get<string>('BCRYPT_SALT_ROUNDS') || '13', 10);
    return this.userRepository.updatePassword(userId, await bcrypt.hash(newPassword, saltRounds));
  }

  async changeRoleOfUser(id: number, roleId: string) {
    const user = await this.findOne(id);
    if(!user) throw new HttpException(`user ${id} não encontrado`, HttpStatus.NOT_FOUND);
    const role = await this.rolesService.findOne(roleId);
    if(!role) throw new HttpException(`cargo ${roleId} não encontrado`, HttpStatus.NOT_FOUND);

    if (user.roleId == role.name) throw new HttpException(`user já possui o cargo ${role.name}`, HttpStatus.CONFLICT);
    const updatedUser = await this.userRepository.changeRoleOfUser(id, role.name);
    if(!updatedUser) throw new HttpException(`Erro ao alterar cargo do usuário ${id}`, HttpStatus.INTERNAL_SERVER_ERROR);
    return updatedUser;
  }

  async addPermissionToUser(id: number, permissionName: string) {
    const user = await this.findOne(id);
    if (!user) throw new HttpException(`user ${id} não encontrado`, HttpStatus.NOT_FOUND);

    if (user.permissions.some((permission) => permission.name == permissionName)) {
      throw new HttpException(`permissão ${permissionName} já foi inserida`, HttpStatus.CONFLICT);
    }

    const permission = await this.permissionsService.findOne(permissionName);
    if (!permission) throw new HttpException(`permissão ${permissionName} não foi encontrada`, HttpStatus.NOT_FOUND);

    return this.userRepository.addPermissionToUser(id, permission.name);
  }

  async removePermissionFromUser(id: number, permissionName: string) {
    const user = await this.findOne(id);
    if (!user) throw new HttpException(`user ${id} não encontrado`, HttpStatus.NOT_FOUND);

    if (!user.permissions.some((permission) => permission.name == permissionName)) {
      throw new HttpException(`permissão ${permissionName} não foi encontrada`, HttpStatus.NOT_FOUND);
    }

    return this.userRepository.removePermissionFromUser(id, permissionName);
  }
}
