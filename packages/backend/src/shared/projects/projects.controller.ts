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
import { Public } from '../../auth/is-public.decorator';
import { ProjectsRepository } from '../repositories/projects/projects-repository';

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
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProjectDto: CreateProjectDto) {
    const data = await this.projectsRepository.create(createProjectDto);

    return { data };
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
    const data = await this.projectsRepository.findAll();

    return { data };
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
    const data = await this.projectsRepository.findOne(id);

    return { data };
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
    const data = await this.projectsRepository.update(id, updateProjectDto);

    return { data };
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
    const data = await this.projectsRepository.remove(id);

    return { data };
  }
}
