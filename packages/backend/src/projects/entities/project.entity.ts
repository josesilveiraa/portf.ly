import { ApiProperty } from '@nestjs/swagger';
import { Project } from '@prisma/client';

export class ProjectEntity implements Project {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  repository: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty()
  readme: string;

  @ApiProperty()
  previewImage: string;
}
