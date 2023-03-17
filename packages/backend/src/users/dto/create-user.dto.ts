import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @Length(8, 255)
  @IsAlphanumeric()
  @ApiProperty()
  username: string;

  @IsStrongPassword({ minSymbols: 0 })
  @ApiProperty()
  password: string;
}
