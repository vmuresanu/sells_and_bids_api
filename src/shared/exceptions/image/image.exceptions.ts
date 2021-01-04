import { HttpException, HttpStatus } from '@nestjs/common';

export class ImageNotFoundException extends HttpException {
  constructor() {
    super('Selected Image has not been found', HttpStatus.NOT_FOUND);
  }
}

export class ImagesNotFoundException extends HttpException {
  constructor() {
    super('Error has occurred when uploading images please retry.', HttpStatus.NOT_FOUND);
  }
}
