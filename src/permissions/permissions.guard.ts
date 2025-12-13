import { Injectable, CanActivate, ExecutionContext, HttpException, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { VALIDATOR_KEY } from './permissions.decorator';
import { UsersService } from 'src/users/users.service';
import PermissionsValidator from './validator/permissions.validator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const validator = this.reflector.getAllAndOverride<PermissionsValidator>(VALIDATOR_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!validator) return true;

    const req = context.switchToHttp().getRequest();
    const user = await this.usersService.findOne(req.user.id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const rolePermissions = user.role.permissions.map(p => p.name);
    const userPermissions = user.permissions.map(p => p.name);
    const allPermissions = Array.from(new Set<string>([...rolePermissions, ...userPermissions]));
    
    console.log({params: JSON.stringify(req.params, null, 2), method: req.method});
    if (!validator.validate(allPermissions, Object.keys(req.params).map(k => req.params[k])))
      throw new HttpException('Você não possui permissão para acessar este recurso', HttpStatus.UNAUTHORIZED);
    else return true;
  }
}