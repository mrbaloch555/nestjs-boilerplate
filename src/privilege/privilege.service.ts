import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/entity/role.entity';
import { Between, In, Repository } from 'typeorm';
import { Privilege } from './entity/privillage.entity';

@Injectable()
export class PrivilegeService {
  constructor(
    @InjectRepository(Privilege)
    private readonly privilegeRepo: Repository<Privilege>,
  ) {}

  async createPrivilege(payload: { name: string; role: Role }) {
    const privilege = await this.privilegeRepo.create({ name: payload.name });
    privilege.role = payload.role;
    await this.privilegeRepo.save(privilege);
    return privilege;
  }

  async findPrivilege(name: string) {
    return this.privilegeRepo.find({
      where: { name },
      relations: ['role'],
    });
  }

  async findOneBy(filter: object) {
    return this.privilegeRepo.findOneBy(filter);
  }
}
