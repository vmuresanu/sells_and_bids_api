import { Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entity/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionRepository)
    private permissionRepository: PermissionRepository) {
  }

  async getPermissionsByUsername(username: string): Promise<string[]> {
    return this.permissionRepository.createQueryBuilder()
      .select('permission.name')
      .innerJoin('role', 'r', 'permission.role_id = r.id')
      .innerJoin('user_roles', 'ur', 'r.id = ur.roleId')
      .innerJoin('user', 'u', 'u.id = ur.userId')
      .where('u.username = :username', {username})
      .getRawMany()
      .then((permissions: Permission[]) => permissions.map(p => p.name));
  }l
}
