import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, Length } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  @ApiProperty({ required: false })
  email: string;

  @Length(8, 255)
  @ApiProperty({ required: false })
  username: string;

  @IsStrongPassword()
  @ApiProperty({ required: false })
  password: string;
}
