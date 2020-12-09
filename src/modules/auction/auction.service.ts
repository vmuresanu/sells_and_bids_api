import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from './entity/auction.entity';
import { AuctionRepository } from './auction.repository';
import { AuctionRequest } from './entity/auction.request';
import { AuctionResponse } from './entity/auction.response';
import { plainToClass } from 'class-transformer';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';

@Injectable()
export class AuctionService {

  constructor(
    @InjectRepository(Auction)
    private readonly auctionRepository: AuctionRepository,
    private readonly userService: UserService,
    @Inject(REQUEST) private readonly request: Request
  ) {
  }

  async create(auctionRequest: AuctionRequest): Promise<AuctionResponse> {
    const username = (this.request.user as User).username;
    const user = await this.userService.getUserByUsername(username);
    const auction = this.auctionRepository.create(auctionRequest);
    auction.user = user;
    return this.auctionRepository
      .save(auction)
      .then((auction: Auction) => {
        return plainToClass(AuctionResponse, auction);
      });
  }
}
