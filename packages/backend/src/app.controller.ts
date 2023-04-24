import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/is-public.decorator';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import {
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';

class LoginPayload {
  @ApiProperty()
  access_token: string;
}

class LoginRequest {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

@ApiTags('auth')
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'Logs an user in' })
  @ApiOkResponse({ description: 'The user access token.', type: LoginPayload })
  @ApiBody({ type: LoginRequest })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  async reauthenticate(@Body() body) {
    return this.authService.reauthenticate(body);
  }

  @ApiOperation({ summary: 'Gets information from a access token.' })
  @ApiHeader({
    name: 'Authorization',
    description: 'The authorization token.',
    example: 'Bearer abc.123.xyz',
  })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
