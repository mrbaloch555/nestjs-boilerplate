import { IsNumber, IsString } from 'class-validator';

export class CreatePrivilegeDto {
  @IsString()
  name: string;

  @IsNumber()
  roleId: number;
}
