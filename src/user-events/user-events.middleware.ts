import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserEventsService } from './user-events.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@modules/users/users.service';

@Injectable()
export class UserEventsMiddleware implements NestMiddleware {
  constructor(
    private readonly userEventsService: UserEventsService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer' || !token) return next();
    
    try {
      const payload = await this.jwtService.verifyAsync<{ id: number }>(token, {secret: this.configService.get('JWT_SECRET')})
      const user = await this.usersService.findOne(payload.id);
      const savedEvent = await this.userEventsService.create({
        userId: user.id,
        action: req.method,
        params: JSON.stringify(req.params.path || ""),
        body: JSON.stringify(req.body || ""),
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        url: req.originalUrl,
      });
      console.log(JSON.stringify(savedEvent, null, 2));
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      return next();
    }
    
    next();
  }
}