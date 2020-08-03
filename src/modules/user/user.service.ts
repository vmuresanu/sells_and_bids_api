import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UserRequest } from './entity/user.request';
import { UserResponse } from './entity/user.response';
import { plainToClass } from 'class-transformer';
import { Role } from '../role/entity/role.entity';

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
      .find({relations: ['roles']})
      .then(user => plainToClass(UserResponse, user));
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username } });
  }

  createUser(userDto: UserRequest): User {
    return this.userRepository.create(userDto);
  }

  async saveUser(userRequest: UserRequest): Promise<UserResponse> {
    let user = await this.userRepository.findOne({ where: { username: userRequest.username } });

    if (user) {
      throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
    }
    
    const userRoles = await this.roleRepository.find({where: {name: In(userRequest.roles)}});
    user = this.userRepository.create(userRequest);
    user.roles = userRoles;
    return this.userRepository
      .save(user)
      .then((u: User) => {
        return plainToClass(UserResponse, u);
      });
  }
}
