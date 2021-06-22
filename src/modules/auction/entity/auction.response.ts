import { Exclude, Expose, Transform, Type } from 'class-transformer';
import dayjs from 'dayjs';
import { ImageResponse } from '../../image/entity/image.response';
import { AuctionTypeEnum } from '../enums/auction-type.enum';
import { MileageTypeEnum } from '../enums/mileage-type.enum';
import { VehicleStateEnum } from '../enums/vehicle-state.enum';

export class AuctionResponse {
  id: string;
  auctionType: AuctionTypeEnum;
  title: string;
  createdDate: string;
  updatedDate: string

  @Transform(({ value }) => value?.username)
  @Expose({ name: 'createdBy' })
  createdBy: string;

  @Transform(({ value }) => value?.username)
  @Expose({ name: 'updatedBy' })
  updatedBy: string;

  make: string;
  model: string;

  @Type(() => Date)
  @Transform(({ value }) => dayjs(value).format('YYYY-MM'))
  year: Date;

  mileage: string;
  mileageType: MileageTypeEnum;
  vehicleState: VehicleStateEnum;
  description: string;
  price: number;
  minBidPrice: number;
  endOfBidDate: Date;

  @Type(() => ImageResponse)
  images: ImageResponse;

  @Exclude()
  imageIds: string[];
}
