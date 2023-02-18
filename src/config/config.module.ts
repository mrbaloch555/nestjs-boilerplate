import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { validateEnvironmentVariables } from './config.validator';
@Module({
  imports: [
    NestConfigModule.forRoot({
      validate: validateEnvironmentVariables,
      isGlobal: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
