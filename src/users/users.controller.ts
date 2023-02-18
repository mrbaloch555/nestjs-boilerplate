import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { isPublic, Roles } from 'src/auth/decorators/role.dectorator';
import { Serialize } from 'src/auth/interceptors/serialiaze-interceptor';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PublicUserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@Serialize(PublicUserDto)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/currentuser')
  @isPublic(true)
  async getCurrentUser(@Request() req) {
    return req.user;
  }

  @Get('/:id')
  @isPublic(true)
  findOne(@Param('id') id: number) {
    return this.userService.findUserBy({ id });
  }

  @Get()
  @Roles('manageUsers')
  findAll() {
    return this.userService.findAll();
  }

  @Patch('/:id')
  @isPublic(true)
  update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(id, body);
  }

  @Delete('/:id')
  @Roles('manageUsers')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
