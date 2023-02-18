import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/admin/entity/admin.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthMiddleware } from 'src/auth/middlewares/auth';
import { HashService } from 'src/common/hash/hash.service';
import { ConfigModule } from 'src/config/config.module';
import { Token } from 'src/token/entity/jwt.entity';
import { TokenService } from 'src/token/token.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Admin, Token]), ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, AdminService, HashService, TokenService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/users/', method: RequestMethod.GET },
        { path: '/users/currentuser', method: RequestMethod.GET },
        { path: '/users/:id', method: RequestMethod.GET },
        { path: '/users/:id', method: RequestMethod.PATCH },
        { path: '/users/:id', method: RequestMethod.DELETE },
      );
  }
}
