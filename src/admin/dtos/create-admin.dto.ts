import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  phone: string;
}
