import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersRepository } from '../shared/repositories/users/users-repository';

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

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_JWT_SECRET,
    });

    return {
      user: payload,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
