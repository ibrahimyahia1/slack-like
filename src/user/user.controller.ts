import { Controller, Get, Post, Body, Headers, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import * as types from './utils/types';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Post('auth/register')
  register(@Body() body: RegisterDto) {
    return this.userService.register(body);
  }

  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: LoginDto) {
    return this.userService.login(body);
  }

  @Get("current-user")
  @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUser() payload: types.JWTPayloadType) {
    return this.userService.getCurrentUser(payload.id)
  }


}
