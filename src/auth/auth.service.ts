import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, providedPassword: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    const validPassword = bcrypt.compare(providedPassword, user.password);

    if (!validPassword) return null;

    const { password, ...result } = user;

    return result;
  }
}
