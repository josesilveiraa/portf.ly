import { IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @Length(5, 100)
  title: string;

  @IsUrl()
  @IsNotEmpty()
  repository: string;

  description: string;

  @IsNotEmpty()
  readme: string;
}
