import { Expose, Transform, Type } from 'class-transformer';
import dayjs from 'dayjs';
import { ImageResponse } from '../../image/entity/image.response';

export class AuctionResponse {
  id: string;
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
  mileageType: string;
  vehicleState: string;
  description: string;

  @Type(() => ImageResponse)
  images: ImageResponse;
}
