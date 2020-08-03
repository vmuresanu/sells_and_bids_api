import { IsNotEmpty } from 'class-validator';
import { RoleRequest } from '../../role/entity/role.request';

export class UserRequest {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  roles: RoleRequest[];
}
