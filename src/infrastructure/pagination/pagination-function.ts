import { Paginate } from './paginator.interface';
import { PaginationOptions } from './pagination-options.interface';
import { HttpException, HttpStatus } from '@nestjs/common';


export function constructPagination<T>(data: T[], options: PaginationOptions): Paginate<T[]> {
  return {
    data: data,
    totalPages: Math.ceil(options.total / options.limit),
    totalItems: options.total
  }
}

export function handleSorting(sortExpression: string) {
  const options = {};
  const criterion = sortExpression.split(',');
  criterion.forEach(criteria => {
    const parameter = criteria.charAt(0);
    const key = criteria.substring(1);
    // ' ' - because '+' is transformed into ' '
    if (parameter !== ' ' && parameter !== '-') {
      throw new HttpException('Invalid sort parameter. Should accept only + or -', HttpStatus.BAD_REQUEST);
    }
    const value = criteria.startsWith('-') ? -1 : 1;
    options[key] = value;
  });
  return options
}
