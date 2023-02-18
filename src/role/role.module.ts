import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { Privilege } from '../privilege/entity/privillage.entity';
import { Role } from './entity/role.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { AuthMiddleware } from 'src/auth/middlewares/auth';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { Admin } from 'src/admin/entity/admin.entity';
import { AdminService } from 'src/admin/admin.service';
import { HashService } from 'src/common/hash/hash.service';
import { TokenService } from 'src/token/token.service';
import { Token } from 'src/token/entity/jwt.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Role, Privilege, User, Admin, Token]),
  ],
  providers: [
    RoleService,
    UsersService,
    AdminService,
    HashService,
    TokenService,
  ],
  controllers: [RoleController],
})
export class RoleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/role', method: RequestMethod.POST });
  }
}
