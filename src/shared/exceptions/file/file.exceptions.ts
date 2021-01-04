import { HttpException, HttpStatus } from '@nestjs/common';

export class FilesNotSelectedException extends HttpException {
  constructor() {
    super('Please select at least one file', HttpStatus.BAD_REQUEST);
  }
}
