import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Enum } from '../../../shared/decorators/enum.decorator';
import { MileageTypeEnum } from '../enums/mileage-type.enum';
import { VehicleStateEnum } from '../enums/vehicle-state.enum';
import { User } from '../../user/entity/user.entity';
import { Image } from '../../image/entity/image.entity';
import { AuctionTypeEnum } from '../enums/auction-type.enum';

@Entity('auction')
export class Auction extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Enum(type => AuctionTypeEnum, { default: AuctionTypeEnum.SALE })
  auctionType: AuctionTypeEnum;

  @Column('varchar')
  title: string;

  @Column('varchar')
  make: string;

  @Column('varchar')
  model: string;

  @Column({ type: 'date', nullable: true })
  year: Date;

  @Column('decimal')
  mileage: number;

  @Enum(type => MileageTypeEnum, { default: MileageTypeEnum.KMH })
  mileageType: MileageTypeEnum;

  @Enum(type => VehicleStateEnum, { default: VehicleStateEnum.USED })
  vehicleState: VehicleStateEnum;

  @Column('varchar')
  description: string;

  @Column({ type: 'numeric', precision: 10, nullable: true })
  price: number;

  @Column({ type: 'datetime', nullable: true })
  endOfBidDate: Date;

  @Column({ type: 'numeric', precision: 10, nullable: true })
  minBidPrice: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(type => User)
  createdBy: User;

  @ManyToOne(type => User)
  updatedBy: User;

  @OneToMany(type => Image, image => image.auction)
  images: Image[];

}
