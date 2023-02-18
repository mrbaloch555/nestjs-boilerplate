import { IsEmail, IsString } from 'class-validator';

export class LoginAdminDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
