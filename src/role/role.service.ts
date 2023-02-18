import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Privilege } from '../privilege/entity/privillage.entity';
import { Role } from './entity/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepositiry: Repository<Role>,
    @InjectRepository(Privilege)
    private privilegeRepositiry: Repository<Privilege>,
  ) {}

  async createRole(name: string) {
    if (await this.findRole({ name })) {
      throw new BadRequestException('Role already exists');
    }
    const role = await this.roleRepositiry.create({
      name,
    });
    return this.roleRepositiry.save(role);
  }
  async findRole(filter: object) {
    return await this.roleRepositiry.findOneBy(filter);
  }

  async findPrivileges(name: string) {
    const role = await this.findRole({ name });
    if (!role) {
      throw new ForbiddenException('Api Forbidden');
    }
    return await this.privilegeRepositiry.find({
      where: {
        id: role.id,
      },
    });
  }
}
