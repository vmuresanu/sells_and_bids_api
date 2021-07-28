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
import { ImageService } from '../image/image.service';
import { constructPagination, handleSorting } from '../../infrastructure/pagination/pagination-function';
import { Paginate } from '../../infrastructure/pagination/paginator.interface';
import { GetAuctionParams } from './models/auction-query-params';
import { constructFilters } from './utils/utility-functions';
import { AuctionNotFoundException } from './exceptions/auction.exceptions';
import { GROUPS } from '../../shared/constants/class-transformer';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuctionService {
  messageSub = new BehaviorSubject('default');

  constructor(
    @InjectRepository(Auction)
    private readonly auctionRepository: AuctionRepository,
    private readonly userService: UserService,
    private readonly imageService: ImageService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
  }

  async getAll(params: GetAuctionParams): Promise<Paginate<AuctionResponse[]>> {
    const sortExpression = params?.sort;
    let orderOptions = {};
    const whereCondition = constructFilters(params.filters);

    if (sortExpression) {
      orderOptions = handleSorting(sortExpression);
    }
    return await this.auctionRepository.createQueryBuilder('auction')
      .leftJoinAndSelect('auction.images', 'images')
      .leftJoinAndSelect('auction.createdBy', 'createdBy')
      .leftJoinAndSelect('auction.updatedBy', 'updatedBy')
      .where(whereCondition)
      .orderBy(orderOptions)
      .addOrderBy('images.orderIndex')
      .getManyAndCount()
      .then(([auction, totalItems]) => {
        params.total = totalItems;
        return constructPagination<AuctionResponse>(plainToClass(AuctionResponse, auction), params);
      });
  }

  async findEntityById(id: string): Promise<Auction> {
    return this.auctionRepository.findOne({ where: { id } });
  }

  async create(auctionRequest: AuctionRequest): Promise<AuctionResponse> {
    const username = (this.request.user as User).username;
    const userEntity = await this.userService.getUserByUsername(username);
    let images = await this.imageService.findByIds(auctionRequest.imageIds);

    await Promise.all(images.map(async (image, index) => {
      if (image.id !== auctionRequest.imageIds[index]) {
        const foundIndex = auctionRequest.imageIds.findIndex(id => id === image.id);
        image.orderIndex = foundIndex;
        return await this.imageService.updateIndex(image.id, foundIndex);
      }
    }))
    images = await this.imageService.findByIds(auctionRequest.imageIds);
    const auction = this.auctionRepository.create(auctionRequest);
    auction.createdBy = userEntity;
    auction.images = images;

    return this.auctionRepository.save(auction).then((auction: Auction) => {
      return plainToClass(AuctionResponse, auction, { groups: [GROUPS.POST] });
    });
  }

  async update(auctionId: string, auctionRequest: AuctionRequest): Promise<AuctionResponse> {
    let auction = await this.auctionRepository.findOne({
      where: { id: auctionId },
      relations: ['createdBy', 'updatedBy', 'images'],
    });

    if (!auction) {
      throw new AuctionNotFoundException();
    }
    const username = (this.request.user as User).username;
    const userEntity = await this.userService.getUserByUsername(username);
    let images = await this.imageService.findByIds(auctionRequest.imageIds);

    await Promise.all(images.map(async (image, index) => {
      if (image.id !== auctionRequest.imageIds[index]) {
        const foundIndex = auctionRequest.imageIds.findIndex(id => id === image.id);
        image.orderIndex = foundIndex;
        return await this.imageService.updateIndex(image.id, foundIndex);
      }
    }))
    images = await this.imageService.findByIds(auctionRequest.imageIds);
    auction.updatedBy = userEntity;
    auction.images = [...images];

    return this.auctionRepository.save({ ...auction, ...auctionRequest }).then((auction: Auction) => {
      return plainToClass(AuctionResponse, auction, { groups: [GROUPS.UPDATE] });
    });
  }

  async delete(id: string): Promise<void> {
    const image = await this.auctionRepository.findOne({ where: { id } });
    if (!image) {
      throw new AuctionNotFoundException();
    }
    await this.auctionRepository.delete({ id });
  }
}
