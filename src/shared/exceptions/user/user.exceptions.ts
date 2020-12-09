import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User with such id doesn\'t exist', HttpStatus.NOT_FOUND);
  }
}
