import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { Permission } from './entity/permission.entity';

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {

}
