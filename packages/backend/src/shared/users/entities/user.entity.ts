import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { ProjectEntity } from '../../projects/entities/project.entity';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  projects: ProjectEntity[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  password: string;
}
