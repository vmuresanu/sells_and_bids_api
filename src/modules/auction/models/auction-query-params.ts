import { PaginationOptions } from '../../../infrastructure/pagination/pagination-options.interface';

export interface GetAuctionParams extends PaginationOptions {
  filters: {
    makeModels: string;
    simpleFilters: {
      mileage: number;
      fromYear: string;
      tillYear: string;
    }
  }
}
