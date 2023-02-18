import { BadRequestException, Injectable } from '@nestjs/common';
import { HashService } from 'src/common/hash/hash.service';
import { ConfigService } from 'src/config/config.service';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/users/dtos/creeate-user.dto';
import { UserLoginDto } from 'src/users/dtos/login-user.dto';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private hashService: HashService,
    private tokenService: TokenService,
    private config: ConfigService,
  ) {}

  async register(payload: CreateUserDto) {
    const user = await this.userService.findUserBy({ email: payload.email });
    if (user) {
      throw new BadRequestException('Email already taken');
    }

    const hashedPassword = await this.hashService.hashPassword(
      payload.password,
    );

    const newUser = {
      ...payload,
      password: hashedPassword,
      role: 'User',
      suspend: false,
      active: true,
    };
    return await this.userService.createUser(newUser);
  }

  async login(payload: UserLoginDto) {
    const user = await this.userService.findUserBy({ email: payload.email });
    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    if (
      !(await this.hashService.checkPassword(payload.password, user.password))
    ) {
      throw new BadRequestException('Invalid Credentials');
    }
    await this.userService.updateUser(user.id, user);
    user.photoPath = this.config.getRootPath() + user.photoPath;
    const tokens = await this.tokenService.generateAuthTokens(user);
    return { user, tokens };
  }
}
