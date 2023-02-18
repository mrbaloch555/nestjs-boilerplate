import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entity/jwt.entity';
import { TokenTypes } from './entity/types/token.types';
import { sign } from 'jsonwebtoken';
import { ConfigService } from 'src/config/config.service';
import { User } from 'src/users/user.entity';
import { Admin } from 'src/admin/entity/admin.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private tokenRepo: Repository<Token>,
    private config: ConfigService,
  ) {}

  async createToken(payload: {
    userId: number;
    role: string;
    type: TokenTypes;
    expiresIn: string;
  }) {
    const tokenPyload = {
      sub: payload.userId,
      role: payload.role,
      iat: Math.floor(Date.now() / 1000),
      expiresIn: payload.expiresIn,
      type: payload.type,
    };
    return sign(tokenPyload, this.config.getJWTAccessTokenSecret());
  }

  async saveToken(payload: {
    token: string;
    user: User | Admin;
    type: TokenTypes;
    expires: string;
    // created_at: Date;
  }) {
    const token = await this.tokenRepo.create({
      token: payload.token,
      type: payload.type,
      expires: payload.expires,
      email: payload.user.email,
      entity: payload.user.role,
    });
    return await this.tokenRepo.save(token);
  }

  async generateAuthTokens(user: User | Admin) {
    let accessTokenExpires = this.config.getJWTAccessTokenExpiry();
    let refreshTokeExpires = this.config.getJWTRefreshTokenExpiry();

    const acccessToken = await this.createToken({
      userId: user.id,
      role: user.role,
      expiresIn: accessTokenExpires,
      type: TokenTypes.ACCESS,
    });

    const refreshToken = await this.createToken({
      userId: user.id,
      role: user.role,
      expiresIn: refreshTokeExpires,
      type: TokenTypes.REFRESH,
    });
    await this.saveToken({
      token: refreshToken,
      user,
      expires: refreshTokeExpires,
      type: TokenTypes.REFRESH,
    });

    return {
      access: {
        token: acccessToken,
        expires: accessTokenExpires,
      },
      refreshToken: {
        token: refreshToken,
        expires: refreshTokeExpires,
      },
    };
  }
}
