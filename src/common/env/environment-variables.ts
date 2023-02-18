import {
  IsBooleanString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum Environment {
  LOCAL = 'local',
  PRODUCTION = 'production',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  ENV: Environment;

  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  //   @IsString()
  //   @IsNotEmpty()
  //   @IsOptional()
  //   DB_NAME?: string;

  //   @IsString()
  //   @IsOptional()
  //   DB_PASSWORD?: string;

  //   @IsString()
  //   @IsOptional()
  //   @IsNotEmpty()
  //   DB_USERNAME?: string;

  //   @IsNumber()
  //   @IsOptional()
  //   @IsNotEmpty()
  //   DB_PORT?: number;

  //   @IsString()
  //   @IsOptional()
  //   @IsNotEmpty()
  //   DB_HOST?: string;
}
