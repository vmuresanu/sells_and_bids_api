import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { HasPermission, HasRole } from '../../infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt/jwt-auth.guard';
import { PERMISSIONS, ROLES } from '../../shared/constants/roles-and-permissions';

@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {
  }

  @Get()
  @HasRole(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard)
  getAllUsers() {
    return this.usersService.getAll();
  }

  @Get(':username')
  @UseGuards(JwtAuthGuard)
  @HasPermission(PERMISSIONS.FEED_PAGE_EDIT)
  getByUsername(@Param('username') username: string) {
    return this.usersService.getUserByUsername(username);
  }
}
