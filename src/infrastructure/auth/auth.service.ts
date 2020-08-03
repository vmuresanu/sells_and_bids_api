import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import { UserRequest } from '../../modules/user/entity/user.request';
import { comparePassword, getToken } from '../../helpers/helpers';
import { UserResponse } from '../../modules/user/entity/user.response';
import { plainToClass } from 'class-transformer';

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
    const user = await this.userService.getUserByUsername(username);
    if (!user || !(await comparePassword(password, user.password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const token = getToken(user.id, user.username);
      return { token };
    }
  }

  async register(userDto: UserRequest): Promise<UserResponse> {
    const { username } = userDto;
    let user = await this.userService.getUserByUsername(username);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return await this.userService.saveUser(userDto);
  }
}
