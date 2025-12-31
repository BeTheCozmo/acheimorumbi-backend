import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { RolesService } from 'src/roles/roles.service';
import { UserLoggedDto } from './dto/user-logged.dto';
import { RoleDto } from 'src/roles/dto/role.dto';
import { CodeGeneratorService } from '@modules/code-generator/code-generator.service';
import { ForgotPasswordRequestDto } from './dto/forgot-password-request.dto';
import { ForgotAccessService } from '@modules/forgot-access/forgot-access.service';
import { AuthMail } from './auth.mail';
import { UpdatePasswordWithCodeDto } from './dto/update-password-with-code.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly rolesService: RolesService,
    private readonly codeGeneratorService: CodeGeneratorService,
    private readonly forgotAccessService: ForgotAccessService,
    private readonly authMailService: AuthMail,
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
    // if (await this.usersService.alreadyExistsByEmail(registerDto.email))
    //   throw new HttpException(`email ${registerDto.email} já existe`, HttpStatus.UNAUTHORIZED);
    // const userRole = await this.rolesService.findOneByName("USER");
    // if (!userRole) throw new HttpException('role do usuário não configurada', HttpStatus.INTERNAL_SERVER_ERROR);

    // return await this.usersService.createByAuth({
    //   ...registerDto,
    //   roleId: userRole.name,
    //   configurations
    // });
  }

  async forgotPasswordRequest({email}: ForgotPasswordRequestDto) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new HttpException('email não encontrado', HttpStatus.NOT_FOUND);

    const code = await this.codeGeneratorService.generateRandomString(12);
    const forgotAccessCode = await this.forgotAccessService.makeRequest({
      userId: user.id,
      code,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 1), // 1 hour
    });

    try {
      await this.authMailService.notifyForgotPassword({
        name: user.name,
        code: code,
        email: user.email
      });
    } catch (error) {
      console.log({error});
    }

    return {success: !!forgotAccessCode};
  }

  async forgotPasswordVerifyCode(code: string) {
    const codeVerified = await this.forgotAccessService.verifyCode(code);
    return {success: codeVerified};
  }

  async updatePasswordWithCode({code, password}: UpdatePasswordWithCodeDto) {
    const codeVerified = await this.forgotAccessService.findOne(code);
    if(!codeVerified) throw new HttpException('código inválido', HttpStatus.UNAUTHORIZED);
    if(codeVerified.used) throw new HttpException('código já utilizado', HttpStatus.UNAUTHORIZED);
    const user = await this.usersService.updatePasswordWithoutOldPassword(codeVerified.userId, password);
  
    await this.forgotAccessService.setUsed(codeVerified.code);
    return {success: true};
  }
}
