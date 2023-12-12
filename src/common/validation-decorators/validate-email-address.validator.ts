/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

import { applyDecorators, Logger } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  EMAIL_DOMAIN_PART,
  EMAIL_LENGTH,
  EMAIL_LOCAL_PART,
} from '../constants/common.constants';
import { OptionalIf } from './optional-if.validator';
import { RequiredIf } from './required-if.validator';

interface Options {
  swagger?: boolean;
  required?: boolean | ((object: any, value: any) => boolean);
}

export function ValidateEmailAddress(
  decoratorOptions?: Options,
  options?: ValidationOptions,
) {
  const logger = new Logger(ValidateEmailAddress.name);
  const { swagger = true, required = true } = decoratorOptions || {};
  const decorators = [IsEmail(), Length(EMAIL_LENGTH.min, EMAIL_LENGTH.max)];

  if (typeof required === 'function') {
    decorators.push(
      OptionalIf((object, value) => !required(object, value)),
      RequiredIf(required),
    );
  } else if (required) {
    decorators.push(IsNotEmpty());
  } else {
    decorators.push(IsOptional());
  }

  const emailValidator = () => (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [],
      options,
      validator: {
        validate(value: string): boolean {
          try {
            if (!value) {
              return false;
            }
            const [localPart, domainPart] = value.split('@');
            if (
              !EMAIL_LOCAL_PART.test(localPart) ||
              !EMAIL_DOMAIN_PART.test(domainPart)
            ) {
              return false;
            }
            return true;
          } catch (e) {
            logger.error(e);
          }
        },
        defaultMessage(args: ValidationArguments): string {
          return `${args.property} contains unsupported characters`;
        },
      },
    });
  };

  if (swagger) {
    if (required) {
      decorators.push(
        ApiPropertyOptional({
          minLength: EMAIL_LENGTH.min,
          maxLength: EMAIL_LENGTH.max,
        }),
      );
    } else {
      decorators.push(
        ApiProperty({
          minLength: EMAIL_LENGTH.min,
          maxLength: EMAIL_LENGTH.max,
        }),
      );
    }
  }

  decorators.push(emailValidator());

  return applyDecorators(...decorators);
}
