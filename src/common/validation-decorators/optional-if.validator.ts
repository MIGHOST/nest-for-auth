/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IsDefined,
  isDefined,
  registerDecorator,
  ValidateIf,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Options } from './interfaces';

export function OptionalIf(
  condition: (object: any, value: any) => boolean,
  decoratorOptions?: Partial<Options>,
  options?: ValidationOptions,
) {
  const { swagger = true } = decoratorOptions || {};
  const decorators = [];

  const ignoreOtherValidators = ValidateIf((object: any, value: any) => {
    const isOptional = condition(object, value);
    return !(isOptional && !isDefined(value));
  });
  const optionalDecorator = () => (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [condition],
      options,
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          const [condition] = args.constraints;
          const isOptional = condition(args.object);
          if (!isOptional && !IsDefined(value)) {
            return false;
          }
          return true;
        },
        defaultMessage(args: ValidationArguments): string {
          const [condition] = args.constraints;
          const isOptional = condition(args.object);
          if (!isOptional && !IsDefined(args.value)) {
            return `${args.property} should not be null or undefined`;
          } else {
            return `${args.property} should not exist`;
          }
        },
      },
    });
    ignoreOtherValidators(object, propertyName);
  };

  if (swagger) {
    decorators.push(ApiPropertyOptional());
  }

  decorators.push(optionalDecorator());

  return applyDecorators(...decorators);
}
