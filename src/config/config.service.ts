import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { Environment } from 'src/common/env/environment-variables';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  private get<T>(key: string): T {
    const configuration = this.nestConfigService.get<T>(key);
    if (
      typeof configuration === 'undefined' &&
      process.env.NODE_ENV !== 'production'
    )
      throw new NotFoundException(`Unable to get nest configuration (${key})`);
    // @ts-ignore
    return configuration;
  }
  getPort(): number {
    return +this.get<number>('PORT');
  }

  getEnvironment(): Environment {
    return this.get('ENV');
  }

  getRootPath(): string {
    return this.get('ROOT_PATH');
  }
  getHashRounds(): number {
    return +this.get<number>('HASH_ROUNDS');
  }

  getJWTAccessTokenExpiry(): string {
    return this.get<string>('JWT_ACCESS_TOKEN_EXPIRY');
  }

  getJWTRefreshTokenExpiry(): string {
    return this.get<string>('JWT_REFRESH_TOKEN_EXPIRY');
  }

  getJWTAccessTokenSecret(): string {
    return this.get<string>('JWT_ACCESS_TOKEN_SECRET');
  }

  getDBConfig() {
    return {
      host: this.get<string>('DB_HOST'),
      port: Number(this.get('DB_PORT')),
      username: this.get<string>('DB_USERNAME'),
      password: this.get<string>('DB_PASSWORD'),
      dbName: this.get<string>('DB_NAME'),
      logging: this.get<'true' | 'false'>('SQL_LOGGING') === 'true',
      ...(process.env.NODE_ENV === 'production'
        ? {
            extra: {
              ssl: true,
              rejectUnauthorized: false,
            },
          }
        : {}),
      // ssl: this.get<'true' | 'false'>('DB_SSL') === 'true',
    };
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    const db = this.getDBConfig();

    const baseConfig = {
      keepConnectionAlive: true,
      type: 'postgres' as const,
      autoLoadEntities: true,
      synchronize: true,
      migrationsRun: true,
      logging: db.logging,
    };

    // AWS provides a RDS env vars
    if (process.env.NODE_ENV === 'production') {
      return {
        ...baseConfig,
        host: this.get<string>('RDS_HOSTNAME'),
        // @ts-ignore
        port: this.get<string>('RDS_PORT'),
        username: this.get<string>('RDS_USERNAME'),
        password: this.get<string>('RDS_PASSWORD'),
        database: this.get<string>('RDS_DB_NAME'),
        // url: this.get<string>('DATABASE_URL'),
      };
    }

    return {
      ...baseConfig,
      host: db.host,
      port: db.port,
      username: db.username,
      password: db.password,
      database: db.dbName,
    };
  }

  getJwtConfig() {
    return {
      secret: this.getJWTAccessTokenSecret(),
    };
  }
}
