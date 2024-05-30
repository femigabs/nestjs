// validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: Joi.ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error, value: result } = this.schema.validate(value, { context: { external: true } });

    if (error) {
      const errorMessage = error.details[0].message.replace(/[\"]/gi, '');
      throw new BadRequestException(errorMessage);
    }

    return result;
  }
};
