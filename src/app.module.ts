import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './infrastructure/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './infrastructure/interceptors/http-error.filter';
import { LoggingInterceptor } from './infrastructure/interceptors/logging.interceptor';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }],
})
export class AppModule {
}
