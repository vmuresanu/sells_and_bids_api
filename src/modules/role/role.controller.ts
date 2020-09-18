import { Controller, Get, Query } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {
  }

  @Get()
  getRoles() {
    return this.roleService.getRoles();
  }

  @Get()
  getRolesByUsername(@Query('username') username: string) {
    return this.roleService.getRolesByUsername(username);
  }
}
