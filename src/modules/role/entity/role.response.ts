import { Exclude, Type } from 'class-transformer';
import { PermissionResponse } from '../../permission/entity/permission.response';

export class RoleResponse {
  @Exclude()
  id;

  name: string;

  @Type(() => PermissionResponse)
  permissions: PermissionResponse[];
}
