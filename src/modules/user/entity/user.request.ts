import { IsNotEmpty } from 'class-validator';

export class UserRequest {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
