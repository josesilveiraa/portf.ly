import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @Length(8, 255)
  @ApiProperty()
  username: string;

  @IsStrongPassword({ minSymbols: 0 })
  @ApiProperty()
  password: string;
}
