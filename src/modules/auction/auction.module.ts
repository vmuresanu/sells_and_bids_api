import { Module } from '@nestjs/common';
import { AuctionController } from './auction.controller';
import { AuctionService } from './auction.service';
import { AuctionRepository } from './auction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([AuctionRepository]),
  ],
  controllers: [AuctionController],
  providers: [AuctionService]
})
export class AuctionModule {}
