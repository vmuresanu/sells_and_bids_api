import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UserUpdateRequest } from './entity/user-update.request';
import { UserResponse } from './entity/user.response';
import { plainToClass } from 'class-transformer';
import { Role } from '../role/entity/role.entity';
import { ROLES } from '../../shared/constants/roles-and-permissions';
import { UserRequest } from './entity/user.request';
import { UserNotFoundException } from '../../shared/exceptions/user/user.exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
  }

  async getAll(): Promise<UserResponse[]> {
    return await this.userRepository
      .find({ relations: ['roles'] })
      .then(user => plainToClass(UserResponse, user));
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async getUserByUsernameWithRolesAndPermissions(username: string): Promise<UserResponse> {
    return this.userRepository
      .findOne({
        relations: ['roles', 'roles.permissions'],
        where: { username },
      })
      .then(user => plainToClass(UserResponse, user));
  }

  async createUser(userRequest: UserRequest): Promise<UserResponse> {
    let user = await this.userRepository.findOne({
      where: { username: userRequest.username },
      relations: ['roles'],
    });

    if (user) {
      throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
    }

    const userRoles = await this.roleRepository.find({ where: { name: ROLES.USER } });
    user = this.userRepository.create(userRequest);
    user.roles = userRoles;

    return this.userRepository
      .save(user)
      .then((u: User) => {
        return plainToClass(UserResponse, u);
      });
  }

  async updateUser(userId: string, userRequest: UserUpdateRequest): Promise<UserResponse> {
    let user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new HttpException('User doesn\'t exist', HttpStatus.BAD_REQUEST);
    }

    if (userRequest.roles) {
      const newRoles = await this.roleRepository.find({ where: { name: In(userRequest.roles) } });
      user.roles = [...newRoles];
    }

    return this.userRepository
      .save({...userRequest, ...user})
      .then((u: User) => {
        return plainToClass(UserResponse, u);
      });
  }
}
