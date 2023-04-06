import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersRepository } from '../repositories/users/users-repository';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, providedPassword: string): Promise<any> {
    const user = await this.usersRepository.findOneByEmail(email);

    const validPassword = await bcrypt.compare(providedPassword, user.password);

    if (!validPassword) return null;

    const { password, ...result } = user;

    return result;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };

    return {
      user: payload,
      access_token: this.jwtService.sign(payload),
    };
  }
}
