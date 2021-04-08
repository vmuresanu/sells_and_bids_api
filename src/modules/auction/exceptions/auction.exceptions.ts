import { HttpException, HttpStatus } from '@nestjs/common';

export class AuctionNotFoundException extends HttpException {
  constructor() {
    super('Required auction has not been found', HttpStatus.NOT_FOUND);
  }
}
