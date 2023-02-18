import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { Token } from './entity/jwt.entity';
import { TokenService } from './token.service';
@Module({
  imports: [TypeOrmModule.forFeature([Token]), ConfigModule],
  providers: [TokenService],
})
export class TokenModule {}
