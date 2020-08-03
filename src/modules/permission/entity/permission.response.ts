import { Exclude } from 'class-transformer';

export class PermissionResponse {
  @Exclude()
  id;

  name: string;
}
