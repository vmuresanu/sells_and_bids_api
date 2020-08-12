import { IsNotEmpty } from 'class-validator';

export class RoleRequest {
  @IsNotEmpty()
  name: string;
}
