import { RoleRequest } from '../../role/entity/role.request';
import { Allow } from 'class-validator';

export class UserUpdateRequest {
  @Allow()
  username?: string;

  @Allow()
  roles?: RoleRequest[];
}
