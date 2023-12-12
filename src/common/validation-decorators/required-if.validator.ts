/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  isDefined,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Options } from './interfaces';

export function RequiredIf(
  condition: (object: any, value: any) => boolean,
  decoratorOptions?: Partial<Options>,
  options?: ValidationOptions,
) {
  const { swagger = true } = decoratorOptions || {};
  const decorators = [];
  const requiredDecorator = () => (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [condition],
      options,
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          const [condition] = args.constraints;
          const isRequired = condition(args.object);
          if (!isRequired) {
            return true;
          }
          return isDefined(value);
        },
        defaultMessage(args: ValidationArguments): string {
          return `${args.property} should exist`;
        },
      },
    });
  };

  if (swagger) {
    decorators.push(ApiPropertyOptional());
  }

  decorators.push(requiredDecorator());

  return applyDecorators(...decorators);
}
