import { Body, Controller, Get, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { ValidationPipe } from '../../infrastructure/pipes/validation.pipe';
import { AuctionRequest } from './entity/auction.request';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt/jwt-auth.guard';
import { HasRole } from '../../infrastructure/decorators/roles.decorator';
import { ROLES } from '../../shared/constants/roles-and-permissions';

@Controller('auction')
export class AuctionController {

  constructor(private auctionService: AuctionService) {
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRole(ROLES.SELLER, ROLES.ADMIN)
  @UsePipes(ValidationPipe)
  async createInvoice(@Body() auctionRequest: AuctionRequest) {
    return await this.auctionService.create(auctionRequest);
  }
}
