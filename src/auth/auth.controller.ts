import { Body, Controller, HttpCode, HttpStatus, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';
import { permissionsValidator } from '@modules/permissions/validator/permissions.validator';
import { Validator } from '@modules/permissions/permissions.decorator';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from '@modules/users/users.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from './auth.guard';
import { PermissionsGuard } from '@modules/permissions/permissions.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: "Login" })
  @ApiResponse({type: LoginResponseDto})
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' }
      }
    },
    examples: {
      'user': {
        value: {
          email: 'user@getnada.com',
          password: '123456789'
        }
      }
    }
  })
  signIn(@Body() signInDto: SignInDto): Promise<LoginResponseDto> {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOperation({ summary: "Register" })
  @ApiResponse({})
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Patch()
  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({ status: 200, description: 'User password updated successfully', type: UserDto })
  @UseGuards(AuthGuard, PermissionsGuard)
  @Validator(permissionsValidator({auth: "id"}, ['update_password']))
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @Request() req) {
    const userId = req.user.id;
    return this.usersService.updatePassword(userId, updatePasswordDto);
  }
}
