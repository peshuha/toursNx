import {
  Body,
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, UserDto } from '@tour/lib-dto-js';
import { AuthGuard } from './auth.guard';
import { Public } from './auth.public';
import { UserService } from '../user/user.service';

@Controller()
export class AuthController {
  constructor(
    private auth: AuthService,
    private usr: UserService
  ) {}

  @Public()
  @Post("login")
  async login(@Body() dt: AuthDto) {
    console.log('AuthController::login', dt);
    return this.auth.signIn(dt.login, dt.password);
  }

  @Public()
  @Post("register")
  register(@Body() user: UserDto) {
      return this.usr.create(user)
  }

}
