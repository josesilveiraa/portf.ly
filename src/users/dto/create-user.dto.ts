import { IsEmail, IsStrongPassword, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @Length(8, 255)
  username: string;

  @IsStrongPassword()
  password: string;
}
