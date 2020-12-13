import { EntityRepository, Repository } from 'typeorm';
import { Auction } from './entity/auction.entity';

@EntityRepository(Auction)
export class AuctionRepository extends Repository<Auction> {

}
