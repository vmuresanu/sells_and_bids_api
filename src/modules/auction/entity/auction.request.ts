import { IsEnum, IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';
import { MileageTypeEnum } from '../enums/mileage-type.enum';
import { VehicleStateEnum } from '../enums/vehicle-state.enum';
import { GROUPS } from '../../../shared/constants/class-transformer';

export class AuctionRequest {

  @IsString({ groups: [GROUPS.POST, GROUPS.UPDATE] })
  @IsOptional({ groups: [GROUPS.UPDATE] })
  title: string;

  @IsString({ groups: [GROUPS.POST, GROUPS.UPDATE] })
  @IsOptional({ groups: [GROUPS.UPDATE] })
  make: string;

  @IsString({ groups: [GROUPS.POST, GROUPS.UPDATE] })
  @IsOptional({ groups: [GROUPS.UPDATE] })
  model: string;

  @IsISO8601({}, { groups: [GROUPS.POST, GROUPS.UPDATE] })
  @IsOptional({ groups: [GROUPS.UPDATE] })
  year: Date;

  @IsNumber({}, { groups: [GROUPS.POST, GROUPS.UPDATE] })
  @IsOptional({ groups: [GROUPS.UPDATE] })
  mileage: number;

  @IsEnum(MileageTypeEnum, { groups: [GROUPS.POST, GROUPS.UPDATE] })
  @IsOptional({ groups: [GROUPS.UPDATE] })
  mileageType: MileageTypeEnum;

  @IsEnum(VehicleStateEnum, { groups: [GROUPS.POST, GROUPS.UPDATE] })
  @IsOptional({ groups: [GROUPS.UPDATE] })
  vehicleState: VehicleStateEnum;

  @IsString({ groups: [GROUPS.POST, GROUPS.UPDATE] })
  @IsOptional({ groups: [GROUPS.UPDATE] })
  description;

  @IsString({ each: true, groups: [GROUPS.POST, GROUPS.UPDATE] })
  @IsOptional({ groups: [GROUPS.POST, GROUPS.UPDATE] })
  imageIds: string[];

}
