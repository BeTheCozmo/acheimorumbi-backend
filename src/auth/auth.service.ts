import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { RolesService } from 'src/roles/roles.service';
import { UserLoggedDto } from './dto/user-logged.dto';
import { RoleDto } from 'src/roles/dto/role.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly rolesService: RolesService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{access_token: string}> {
    const user = await this.usersService.findByEmail(signInDto.email);
    if(!user) throw new HttpException('email ou senha inválidos', HttpStatus.UNAUTHORIZED);

    const isValidPassword = await bcrypt.compare(signInDto.password, user.password);
    if(!isValidPassword) throw new HttpException('email ou senha inválidos', HttpStatus.UNAUTHORIZED);

    const payload: UserLoggedDto = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: {
        ...user.role,
        permissions: user.role.permissions.map(permission => permission.name)
      },
      permissions: user.permissions.map(permission => permission.name)
    };
    return { access_token: (await this.jwtService.signAsync(payload)) };
  }

  async register(registerDto: RegisterDto) {
    if (await this.usersService.alreadyExistsByEmail(registerDto.email))
      throw new HttpException(`email ${registerDto.email} já existe`, HttpStatus.UNAUTHORIZED);
    const userRole = await this.rolesService.findOneByName("USER");
    if (!userRole) throw new HttpException('role do usuário não configurada', HttpStatus.INTERNAL_SERVER_ERROR);

    return await this.usersService.createByAuth({
      ...registerDto,
      roleId: userRole.name,
    });
  }
}
