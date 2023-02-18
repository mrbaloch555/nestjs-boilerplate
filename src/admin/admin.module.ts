import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from 'src/token/entity/jwt.entity';
import { Admin } from './entity/admin.entity';
import { AuthMiddleware } from 'src/auth/middlewares/auth';
import { User } from 'src/users/user.entity';
import { ConfigService } from 'src/config/config.service';
import { UsersService } from 'src/users/users.service';
import { HashService } from 'src/common/hash/hash.service';
import { TokenService } from 'src/token/token.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Token, Admin, User])],
  providers: [
    AdminService,
    ConfigService,
    UsersService,
    HashService,
    TokenService,
    AuthService,
  ],
  controllers: [AdminController],
  exports: [ConfigService, UsersService, TokenService, AuthService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: '/admin',
        method: RequestMethod.POST,
      },
      {
        path: '/admin',
        method: RequestMethod.GET,
      },
      {
        path: '/admin/:id',
        method: RequestMethod.GET,
      },
      {
        path: '/admin/:id',
        method: RequestMethod.PATCH,
      },

      {
        path: '/admin/:id',
        method: RequestMethod.DELETE,
      },
    );
  }
}
