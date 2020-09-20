import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { HasPermission, HasRole } from '../../infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt/jwt-auth.guard';
import { PERMISSIONS, ROLES } from '../../shared/constants/roles-and-permissions';
import { ValidationPipe } from '../../infrastructure/pipes/validation.pipe';
import { UserUpdateRequest } from './entity/user-update.request';
import { UserRequest } from './entity/user.request';

@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }

  @Get(':username')
  @UseGuards(JwtAuthGuard)
  @HasPermission(PERMISSIONS.FEED_PAGE_EDIT)
  getByUsername(@Param('username') username: string) {
    return this.usersService.getUserByUsername(username);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() userRequest: UserRequest) {
    return this.usersService.createUser(userRequest);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() userRequest: UserUpdateRequest) {
    return this.usersService.updateUser(id, userRequest);
  }
}
