import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UserRequest } from '../../modules/user/entity/user.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() userRequest: UserRequest) {
    return this.authService.login(userRequest);
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  register(@Body() userRequest: UserRequest) {
    return this.authService.register(userRequest);
  }
}
