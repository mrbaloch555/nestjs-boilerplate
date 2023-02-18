import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from 'src/common/hash/hash.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/creeate-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private hashService: HashService,
  ) {}

  async createUser(payload: CreateUserDto) {
    const user = await this.userRepo.create(payload);
    return await this.userRepo.save(user);
  }

  async findUserBy(filter: object) {
    return await this.userRepo.findOneBy(filter);
  }

  async findAll() {
    return this.userRepo.find();
  }

  async updateUser(id: number, payload: Partial<User>) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usr not found');
    }
    if (user.id !== Number(id)) {
      throw new UnauthorizedException('Not authorize to perform operation');
    }
    Object.assign(user, payload);
    await this.userRepo.save(user);
    return user;
  }

  async delete(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.userRepo.remove(user);
  }
}
