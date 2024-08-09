// import { Controller } from '@nestjs/common';

// @Controller('auth')
// export class AuthController {}
import { Controller, Get, Post, Body, UseGuards, Request,UnauthorizedException  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from '../user/user.entity';
import { LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
async login(@Body() loginDto: LoginDto) {
  const validatedUser = await this.authService.validateUser(
    loginDto.email,
    loginDto.password,
  );
  if (!validatedUser) {
    throw new UnauthorizedException();
  }
  return this.authService.login(validatedUser);
}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
