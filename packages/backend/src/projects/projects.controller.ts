import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiHeader,
} from '@nestjs/swagger';
import { ProjectEntity } from './entities/project.entity';
import { Public } from 'src/auth/is-public.decorator';
import { ProjectsRepository } from 'src/repositories/project/projects-repository';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private projectsRepository: ProjectsRepository) {}

  @Post()
  @ApiOperation({ summary: 'Create a project' })
  @ApiCreatedResponse({
    type: ProjectEntity,
    description: 'The created project.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'The authorization token.',
    example: 'Bearer abc.123.xyz',
  })
  async create(@Body() createProjectDto: CreateProjectDto) {
    const { title, repository, description, readme, previewImage } =
      createProjectDto;

    return await this.projectsRepository.create(
      title,
      repository,
      description,
      readme,
      previewImage,
    );
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiOkResponse({
    type: ProjectEntity,
    isArray: true,
    description: 'All project records.',
  })
  async findAll() {
    return await this.projectsRepository.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get one project' })
  @ApiOkResponse({ type: ProjectEntity, description: 'The found project.' })
  @ApiBadRequestResponse({
    description: 'Invalid ID (must be 24-char length).',
  })
  @ApiNotFoundResponse({ description: 'Project not found.' })
  async findOne(@Param('id') id: string) {
    return await this.projectsRepository.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a project' })
  @ApiOkResponse({ type: ProjectEntity, description: 'The updated project.' })
  @ApiNotFoundResponse({ description: 'Project not found.' })
  @ApiHeader({
    name: 'Authorization',
    description: 'The authorization token.',
    example: 'Bearer abc.123.xyz',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const { title, repository, description, readme, previewImage } =
      updateProjectDto;

    return await this.projectsRepository.update(
      id,
      title,
      repository,
      description,
      readme,
      previewImage,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a project' })
  @ApiNoContentResponse({ description: 'Project removed successfully.' })
  @ApiNotFoundResponse({ description: 'Project not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiHeader({
    name: 'Authorization',
    description: 'The authorization token.',
    example: 'Bearer abc.123.xyz',
  })
  async remove(@Param('id') id: string) {
    return await this.projectsRepository.remove(id);
  }
}
