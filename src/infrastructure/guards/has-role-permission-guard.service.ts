import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../modules/user/user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class HasRolePermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
    private jwtService: JwtService,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<string[]>('hasPermission', context.getHandler());
    const roles = this.reflector.get<string[]>('hasRole', context.getHandler());

    if (!roles && !permissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const username = request.params.username;
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = this.jwtService.decode(token);

    if (roles) {
      return !!roles.find(r => decodedToken['roles'].includes(r));
    }

    return !!permissions.find(p => decodedToken['permissions'].includes(p));
  }
}
