import { IsNotEmpty } from 'class-validator';
import { Role } from './role.entity';

export class RoleRequest {
  @IsNotEmpty()
  name: string;
}
