import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }

  @Get(':username')
  getByUsername(@Param('username') username: string) {
    return this.usersService.getUserByUsername(username);
  }
}
