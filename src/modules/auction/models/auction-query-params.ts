import { PaginationOptions } from '../../../infrastructure/pagination/pagination-options.interface';
import { VehicleStateEnum } from '../enums/vehicle-state.enum';

export interface GetAuctionParams extends PaginationOptions {
  filters: {
    makeModels: string;
    simpleFilters: {
      mileage: number;
      fromYear: string;
      toYear: string;
      vehicleState: VehicleStateEnum;
    }
  }
}
