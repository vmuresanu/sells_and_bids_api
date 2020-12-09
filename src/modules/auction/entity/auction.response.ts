import { Expose, Transform, Type } from 'class-transformer';
import dayjs from 'dayjs';

export class AuctionResponse {
  id: string;

  @Transform(value => dayjs(value).format('YYYY-MM-DD'))
  createdDate: string;

  @Transform(user => user.username)
  @Expose({ name: 'user' })
  username: string;

  make: string;

  model: string;

  @Type(() => Date)
  @Transform(value => dayjs(value).format('YYYY-MM'))
  year: Date;

  mileage: string;

  mileageType: string;

  vehicleState: string;

  description: string;
}
