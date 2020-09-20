import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import { comparePassword, generateToken, mapRolesAndPermissions } from '../../helpers/helpers';
import { UserRequest } from '../../modules/user/entity/user.request';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService
  ) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);
    if (user && await comparePassword(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDto: UserRequest) {
    const { username, password } = userDto;
    const userEntity = await this.userService.getUserByUsername(username);
    const userWithRolesAndPermissions = await this.userService.getUserByUsernameWithRolesAndPermissions(username);
    if (!userEntity || !(await comparePassword(password, userEntity.password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const mappedUserWithRolesAndPermissions = mapRolesAndPermissions(userWithRolesAndPermissions);
      const token = generateToken(
        userEntity.id,
        userEntity.username,
        mappedUserWithRolesAndPermissions.roles,
        mappedUserWithRolesAndPermissions.permissions
      );
      return { token };
    }
  }
}
