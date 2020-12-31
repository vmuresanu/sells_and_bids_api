import { Module } from '@nestjs/common';
import { AuctionController } from './auction.controller';
import { AuctionService } from './auction.service';
import { AuctionRepository } from './auction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    UserModule,
    ImageModule,
    TypeOrmModule.forFeature([AuctionRepository]),
  ],
  controllers: [AuctionController],
  providers: [AuctionService]
})
export class AuctionModule {}
