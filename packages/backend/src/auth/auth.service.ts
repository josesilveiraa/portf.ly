import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersRepository } from '../shared/repositories/users/users-repository';

type PayloadBody = {
  access_token: string;
  refresh_token: string;
};

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

  async reauthenticate(body: PayloadBody) {
    const payload: User = await this.verifyRefreshToken(body);

    return this.login(payload);
  }

  async verifyRefreshToken(body: PayloadBody) {
    const { refresh_token } = body;

    if (!refresh_token) {
      throw new NotFoundException();
    }

    const email = this.jwtService.decode(refresh_token)['email'];
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user) throw new NotFoundException();

    try {
      this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_JWT_SECRET,
      });
      return user;
    } catch (err) {
      throw new UnauthorizedException(err.name);
    }
  }
}
