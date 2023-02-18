import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from 'src/admin/admin.module';
import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/admin/entity/admin.entity';
import { HashService } from 'src/common/hash/hash.service';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { Privilege } from 'src/privilege/entity/privillage.entity';
import { PrivilegeService } from 'src/privilege/privilege.service';
import { Role } from 'src/role/entity/role.entity';
import { RoleService } from 'src/role/role.service';
import { Token } from 'src/token/entity/jwt.entity';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Token, Role, Privilege, Admin]),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    HashService,
    TokenService,
    RoleService,
    PrivilegeService,
    AdminService,
  ],
  exports: [RoleService, PrivilegeService],
})
export class AuthModule {}
