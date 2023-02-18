import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class HashService {
  constructor(private readonly configService: ConfigService) {}

  async checkPassword(
    rawPassword: string,
    passwordHash: string,
  ): Promise<boolean> {
    return compare(rawPassword, passwordHash);
  }

  async hashPassword(rawPassword: string): Promise<string> {
    return hash(rawPassword, this.configService.getHashRounds());
  }
}
