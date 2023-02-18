import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/role.dectorator';

import { AdminService } from './admin.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { LoginAdminDto } from './dtos/login-admin.dto';
import { Admin } from './entity/admin.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/')
  @Roles('manageAdmins')
  createAdmin(@Body() body: CreateAdminDto) {
    return this.adminService.createAdmin(body);
  }

  @Get()
  @Roles('manageAdmins')
  findAll() {
    return this.adminService.findAll();
  }

  @Post('/login')
  login(@Body() body: LoginAdminDto) {
    return this.adminService.login(body);
  }

  @Get('/:id')
  @Roles('manageAdmins')
  findOne(@Param('id') id: number) {
    return this.adminService.findOneBy({ id });
  }

  @Patch('/:id')
  @Roles('manageAdmins')
  update(@Param('id') id: number, @Body() body: Partial<Admin>) {
    return this.adminService.update(id, body);
  }

  @Delete('/:id')
  @Roles('manageUsers')
  delete(@Param('id') id: number) {
    return this.adminService.delete(id);
  }
}
