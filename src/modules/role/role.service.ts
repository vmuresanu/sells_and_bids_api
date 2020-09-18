import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { Role } from './entity/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private roleRepository: RoleRepository) {
  }

  async getRoles(): Promise<string[]> {
    return await this.roleRepository
      .find()
      .then(roles => roles.map(r => r.name));
  }

  async getRolesByUsername(username: string): Promise<Role[]> {
    return this.roleRepository.find({relations: ['permissions']});
   /* return this.roleRepository.createQueryBuilder()
      .select('role.name')
      .innerJoin('user_role', 'ur', 'role.id = ur.role_id')
      .innerJoin('user', 'u', 'u.id = ur.user_id')
      .where('u.username = :username', {username})
      .getRawMany()
      .then((roles: Role[]) => roles.map(r => r.name));*/
  }
}
