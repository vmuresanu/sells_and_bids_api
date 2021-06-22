import {
  IsDecimal,
  IsEnum,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Validate,
  ValidateIf,
  Validator,
} from 'class-validator';
import { MileageTypeEnum } from '../enums/mileage-type.enum';
import { VehicleStateEnum } from '../enums/vehicle-state.enum';
import { GROUPS } from '../../../shared/constants/class-transformer';
import { AuctionTypeEnum } from '../enums/auction-type.enum';

export class AuctionRequest {
  @IsEnum(AuctionTypeEnum, { groups: [GROUPS.POST, GROUPS.UPDATE] })
  @IsOptional({ groups: [GROUPS.UPDATE] })
  auctionType: AuctionTypeEnum;

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
  description: string;

  @ValidateIf((o) => o.auctionType === AuctionTypeEnum.SALE, {
    groups: [GROUPS.POST, GROUPS.UPDATE],
  })
  @Max(1000000000, { groups: [GROUPS.POST, GROUPS.UPDATE] })
  @IsNumber({ maxDecimalPlaces: 0 }, { groups: [GROUPS.POST, GROUPS.UPDATE] })
  price: number;

  @ValidateIf((o) => o.auctionType && o.auctionType !== AuctionTypeEnum.SALE, {
    groups: [GROUPS.POST, GROUPS.UPDATE],
  })
  @IsISO8601({}, { groups: [GROUPS.POST, GROUPS.UPDATE] })
  endOfBidDate: Date;

  @ValidateIf((o) => o.auctionType === AuctionTypeEnum.MIN_BID, {
    groups: [GROUPS.POST, GROUPS.UPDATE],
  })
  @Max(1000000000, { groups: [GROUPS.POST, GROUPS.UPDATE] })
  @IsNumber(null, { groups: [GROUPS.POST, GROUPS.UPDATE] })
  minBidPrice;

  @IsString({ each: true, groups: [GROUPS.POST, GROUPS.UPDATE] })
  @IsOptional({ groups: [GROUPS.POST, GROUPS.UPDATE] })
  imageIds: string[];
}
