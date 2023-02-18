import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/role.dectorator';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  // @Roles('manageRoles')
  async createRole(@Body() body: CreateRoleDto) {
    return await this.roleService.createRole(body.name);
  }
}
