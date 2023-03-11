import { ApiProperty } from '@nestjs/swagger';
import { AdminUser } from '@prisma/client';

export class UserEntity implements AdminUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  password: string;
}
