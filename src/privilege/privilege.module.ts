import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/admin/entity/admin.entity';
import { AuthMiddleware } from 'src/auth/middlewares/auth';
import { HashService } from 'src/common/hash/hash.service';
import { ConfigService } from 'src/config/config.service';
import { Role } from 'src/role/entity/role.entity';
import { RoleService } from 'src/role/role.service';
import { Token } from 'src/token/entity/jwt.entity';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Privilege } from './entity/privillage.entity';
import { PrivilegeController } from './privilege.controller';
import { PrivilegeService } from './privilege.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Privilege, Role, User, Admin, Token]),
  ],
  providers: [
    PrivilegeService,
    RoleService,
    UsersService,
    ConfigService,
    AdminService,
    HashService,
    TokenService,
  ],
  controllers: [PrivilegeController],
})
export class PrivilegeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/privilege', method: RequestMethod.POST });
  }
}
