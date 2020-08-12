import { Exclude, Type } from 'class-transformer';
import { RoleResponse } from '../../role/entity/role.response';

export class UserResponse {
    @Exclude()
    id;

    username: string;

    @Exclude()
    password: string;

    @Type(() => RoleResponse)
    roles: RoleResponse[];

    createDate: Date;
}
