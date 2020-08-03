import { Exclude, Type } from 'class-transformer';
import { PermissionResponse } from '../../permission/entity/permission.response';
import { Role } from '../../role/entity/role.entity';

export class UserResponse {
    @Exclude()
    id;

    username: string;

    @Exclude()
    password: string;


    @Exclude()
    roles: Role[];

    createDate: Date;

    @Type(() => PermissionResponse)
    permissions: string[];
}
