import { SetMetadata } from '@nestjs/common';

export const HasPermission = (...roles: string[]) => SetMetadata('hasPermission', roles);
export const HasRole = (...roles: string[]) => SetMetadata('hasRole', roles);
