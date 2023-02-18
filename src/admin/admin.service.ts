import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from 'src/common/hash/hash.service';
import { TokenService } from 'src/token/token.service';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';
import { Admin } from './entity/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
  ) {}

  async createAdmin(body: CreateAdminDto): Promise<Admin> {
    const exitsingAdmin = await this.findOneBy({ email: body.email });
    if (exitsingAdmin) {
      throw new BadRequestException('Email already taken');
    }

    const hashedPassword = await this.hashService.hashPassword(body.password);
    const newAdmin = {
      ...body,
      password: hashedPassword,
      role: 'Admin',
      suspend: false,
    };
    const admin = this.adminRepo.create(newAdmin);
    return await this.adminRepo.save(admin);
  }

  async findOneBy(filter: object): Promise<Admin | null> {
    return await this.adminRepo.findOneBy(filter);
  }

  async findAll(): Promise<Admin[] | []> {
    return await this.adminRepo.find();
  }

  async update(id: number, body: Partial<Admin>): Promise<Admin> {
    const admin = await this.findOneBy({ id });
    if (!admin) {
      throw new BadRequestException('nothing found for this id');
    }
    Object.assign(admin, body);
    return await this.adminRepo.save(admin);
  }

  async delete(id: number): Promise<Admin> {
    const admin = await this.findOneBy({ id });
    if (!admin) {
      throw new BadRequestException('nothing found for this id');
    }
    return await this.adminRepo.remove(admin);
  }

  async login(payload: { email: string; password: string }) {
    const admin = await this.findOneBy({ email: payload.email });
    if (!admin) {
      throw new BadRequestException('Invalid Credentials');
    }
    console.log(admin);

    if (
      !(await this.hashService.checkPassword(payload.password, admin.password))
    ) {
      throw new BadRequestException('Invalid Credentials');
    }
    await this.update(admin.id, admin);
    const tokens = await this.tokenService.generateAuthTokens(admin);
    return { admin, tokens };
  }
}
