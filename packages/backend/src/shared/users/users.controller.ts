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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from '../repositories/users/users-repository';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersRepository: UsersRepository) {}

  @Post()
  @ApiOperation({ summary: 'Create an user' })
  @ApiCreatedResponse({ type: UserEntity, description: 'The created user.' })
  @ApiHeader({
    name: 'Authorization',
    description: 'The authorization token.',
    example: 'Bearer abc.123.xyz',
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersRepository.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @ApiHeader({
    name: 'Authorization',
    description: 'The authorization token.',
    example: 'Bearer abc.123.xyz',
  })
  async findAll() {
    return await this.usersRepository.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one user' })
  @ApiOkResponse({ type: UserEntity, description: 'The found user.' })
  @ApiBadRequestResponse({
    description: 'Invalid ID (must be 24-char length).',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiHeader({
    name: 'Authorization',
    description: 'The authorization token.',
    example: 'Bearer abc.123.xyz',
  })
  async findOne(@Param('id') id: string) {
    return await this.usersRepository.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an user' })
  @ApiOkResponse({ type: UserEntity, description: 'The updated user.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiHeader({
    name: 'Authorization',
    description: 'The authorization token.',
    example: 'Bearer abc.123.xyz',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an user' })
  @ApiNoContentResponse({ description: 'User removed successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiHeader({
    name: 'Authorization',
    description: 'The authorization token.',
    example: 'Bearer abc.123.xyz',
  })
  async remove(@Param('id') id: string) {
    return await this.usersRepository.remove(id);
  }
}
