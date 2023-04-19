import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl, Length } from 'class-validator';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @Length(5, 100)
  title?: string;

  @ApiProperty({
    example: 'https://github.com/josesilveiraa/josesilveiraa',
    required: false,
  })
  @IsUrl()
  @IsNotEmpty()
  repository?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  readme?: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  userId?: string;

  @ApiProperty({ required: false })
  previewImage?: string;
}
