import { HttpException, HttpStatus } from '@nestjs/common';

export class ImageNotFoundException extends HttpException {
  constructor() {
    super('Selected Image has not been found', HttpStatus.NOT_FOUND);
  }
}
