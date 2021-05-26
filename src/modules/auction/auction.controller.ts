import { Body, Controller, Delete, Get, Param, Post, Put, Query, Sse, UseGuards, UsePipes } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { ValidationPipe } from '../../infrastructure/pipes/validation.pipe';
import { AuctionRequest } from './entity/auction.request';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt/jwt-auth.guard';
import { HasRole } from '../../infrastructure/decorators/roles.decorator';
import { ROLES } from '../../shared/constants/roles-and-permissions';
import { AuctionResponse } from './entity/auction.response';
import { Paginate } from '../../infrastructure/pagination/paginator.interface';
import { GROUPS } from '../../shared/constants/class-transformer';
import { VehicleStateEnum } from './enums/vehicle-state.enum';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Controller('auction')
export class AuctionController {

  constructor(private auctionService: AuctionService) {
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.auctionService.messageSub.pipe(map((val) => ({ data: val})));
  }

  @Get()
  async getAllAuctions(
    @Query('page') page = 0,
    @Query('limit') limit = 50,
    @Query('sort') sort?: string,
    @Query('make-models') makeModels?: string,
    @Query('mileage') mileage?: number,
    @Query('fromYear') fromYear?: string,
    @Query('toYear') toYear?: string,
    @Query('vehicleState') vehicleState?: VehicleStateEnum,
  ): Promise<Paginate<AuctionResponse[]>> {
    this.auctionService.messageSub.next('Poop')
    return await this.auctionService.getAll({
      page,
      limit,
      sort,
      filters: {
        makeModels,
        simpleFilters: {
          mileage, fromYear, toYear, vehicleState,
        },
      },
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRole(ROLES.SELLER, ROLES.ADMIN)
  @UsePipes(new ValidationPipe(GROUPS.POST))
  async createAuction(@Body() auctionRequest: AuctionRequest) {
    return await this.auctionService.create(auctionRequest);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HasRole(ROLES.SELLER, ROLES.ADMIN)
  @UsePipes(new ValidationPipe(GROUPS.UPDATE))
  async updateAuction(@Param('id') id: string, @Body() auctionRequest: AuctionRequest) {
    return await this.auctionService.update(id, auctionRequest);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HasRole(ROLES.SELLER, ROLES.ADMIN)
  async deleteAuction(@Param('id') id: string) {
    return await this.auctionService.delete(id);
  }
}
