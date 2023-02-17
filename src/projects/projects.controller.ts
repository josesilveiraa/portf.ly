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
} from '@nestjs/swagger';
import { ProjectEntity } from './entities/project.entity';

@ApiTags('projects')
@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a project' })
  @ApiCreatedResponse({
    type: ProjectEntity,
    description: 'The created project.',
  })
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiOkResponse({
    type: ProjectEntity,
    isArray: true,
    description: 'All project records.',
  })
  async findAll() {
    return await this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one project' })
  @ApiOkResponse({ type: ProjectEntity, description: 'The found project.' })
  @ApiBadRequestResponse({
    description: 'Invalid ID length (must be 24-char length).',
  })
  @ApiNotFoundResponse({ description: 'Project not found.' })
  async findOne(@Param('id') id: string) {
    return await this.projectsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a project' })
  @ApiOkResponse({ type: ProjectEntity, description: 'The updated project.' })
  @ApiNotFoundResponse({ description: 'Project not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a project' })
  @ApiNoContentResponse({ description: 'Project removed successfully.' })
  @ApiNotFoundResponse({ description: 'Project not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.projectsService.remove(id);
  }
}
