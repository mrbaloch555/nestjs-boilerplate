import { verify } from 'jsonwebtoken';
import {
  NestMiddleware,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from 'src/config/config.service';
import { AdminService } from 'src/admin/admin.service';

/** The AuthMiddleware is used to
 * (1) read the request header bearer token/user access token
 * (2) decrypt the access token to get the user object
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly config: ConfigService,
    private readonly userService: UsersService,
    private readonly adminService: AdminService,
  ) {}

  async use(req: Request | any, res: Response, next: () => void) {
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    let user;

    if (!bearerHeader || !accessToken) {
      throw new UnauthorizedException('Please authenticate');
    }

    try {
      const payload = verify(
        accessToken,
        this.config.getJWTAccessTokenSecret(),
      );
      if (payload.role === 'Admin') {
        user = await this.adminService.findOneBy({ id: payload.sub });
      } else if (payload.role === 'User') {
        user = await this.userService.findUserBy({ id: payload.sub });
      }
    } catch (error) {
      throw new UnauthorizedException('Please authenticate');
    }
    if (!user) {
      throw new UnauthorizedException('Please authenticate');
    }
    req.user = user;
    next();
  }
}
