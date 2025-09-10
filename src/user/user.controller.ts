import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

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

}
