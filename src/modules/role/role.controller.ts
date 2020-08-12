import { Controller, Get, Query } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {
  }

  @Get()
  getPermissionsByUsername(@Query('username') username: string) {
    return this.roleService.getRolesByUsername(username);
  }
}
