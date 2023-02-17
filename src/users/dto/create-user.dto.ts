import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @Length(8, 255)
  @ApiProperty()
  username: string;

  @IsStrongPassword()
  @ApiProperty()
  password: string;
}
