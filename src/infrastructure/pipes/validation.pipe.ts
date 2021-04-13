import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {

  constructor(public groupType?: string) {
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    if (value instanceof Object && this.isEmpty(value)) {
      throw new HttpException('Validation failed: No body submitted', HttpStatus.BAD_REQUEST);
    }

    const { metatype } = metadata;

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    let errors;

    if (this.groupType) {
      errors = await validate(object, { whitelist: true, groups: [this.groupType] })
    } else {
      errors = await validate(object, { whitelist: true })
    }

    if (errors.length > 0) {
      throw new HttpException({text: 'Validation failed', count: errors.length, errors: this.formatErrors(errors)}, HttpStatus.BAD_REQUEST);
    }
    return object;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: any[]) {
    return errors.map(err => {
      for (const property in err.constraints) {
        return {
          path: err.property,
          errorMessage: err.constraints[property],
        };
      }
    });
  }

  private isEmpty(value: any) {
    return Object.keys(value).length <= 0;
  }
}
