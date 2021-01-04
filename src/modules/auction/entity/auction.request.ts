import { IsEnum, IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';
import { MileageTypeEnum } from './mileage-type.enum';
import { VehicleStateEnum } from './vehicle-state.enum';

export class AuctionRequest {

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsISO8601()
  year: Date;

  @IsNumber()
  mileage: number;

  @IsEnum(MileageTypeEnum)
  mileageType: MileageTypeEnum;

  @IsEnum(VehicleStateEnum)
  vehicleState: VehicleStateEnum;

  @IsString()
  description;

  @IsString({ each: true })
  @IsOptional()
  imageIds: string[];

}
