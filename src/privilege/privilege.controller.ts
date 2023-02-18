import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/role.dectorator';
import { RoleService } from 'src/role/role.service';
import { CreatePrivilegeDto } from './dtos/create-privilege.dto';
import { PrivilegeService } from './privilege.service';

@Controller('privilege')
export class PrivilegeController {
  constructor(
    private readonly privilegeService: PrivilegeService,
    private readonly roleService: RoleService,
  ) {}

  @Post()
  @Roles('managePrivileges')
  async createPrivileage(@Body() body: CreatePrivilegeDto) {
    const role = await this.roleService.findRole({ id: body.roleId });
    if (!role) {
      throw new BadRequestException('Role not found');
    }
    const privilege = await this.privilegeService.findOneBy({
      name: body.name,
    });
    if (privilege) {
      throw new BadRequestException('Privilege already exists');
    }
    return this.privilegeService.createPrivilege({ name: body.name, role });
  }
}
