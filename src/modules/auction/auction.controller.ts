import { Body, Controller, Get, Post, Query, Req, UseGuards, UsePipes } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { ValidationPipe } from '../../infrastructure/pipes/validation.pipe';
import { AuctionRequest } from './entity/auction.request';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt/jwt-auth.guard';
import { HasRole } from '../../infrastructure/decorators/roles.decorator';
import { ROLES } from '../../shared/constants/roles-and-permissions';
import { AuctionResponse } from './entity/auction.response';
import { Paginate } from '../../infrastructure/pagination/paginator.interface';

@Controller('auction')
export class AuctionController {

  constructor(private auctionService: AuctionService) {
  }

  @Get()
  async getAllAuctions(
    @Query('page') page = 0,
    @Query('limit') limit = 50,
    @Query('sort') sort?: string,
  ): Promise<Paginate<AuctionResponse[]>> {
    return await this.auctionService.getAll({ page, limit, sort });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRole(ROLES.SELLER, ROLES.ADMIN)
  @UsePipes(ValidationPipe)
  async createAuction(@Body() auctionRequest: AuctionRequest) {
    return await this.auctionService.create(auctionRequest);
  }
}
