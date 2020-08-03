import { Controller, Get, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Controller('permissions')
export class PermissionController {
  constructor(private permissionService: PermissionService) {
  }

  @Get()
  getPermissionsByUsername(@Query('username') username: string) {
    return this.permissionService.getPermissionsByUsername(username);
  }
}
