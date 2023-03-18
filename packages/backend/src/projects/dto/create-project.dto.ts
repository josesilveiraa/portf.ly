import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(5, 100)
  title: string;

  @ApiProperty({ example: 'https://github.com/josesilveiraa/josesilveiraa' })
  @IsUrl()
  @IsNotEmpty()
  repository: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  readme: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  previewImage: string;
}
