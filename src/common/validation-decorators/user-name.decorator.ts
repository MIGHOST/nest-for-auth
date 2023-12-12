import { IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';

import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import {
  USER_NAME_LENGTH,
  USER_NAME_REGEX,
} from '../constants/common.constants';
import { Options } from './interfaces';

export function UserName(options?: Options) {
  const { swagger = true, required = true } = options || {};
  const decorators = [
    required ? IsNotEmpty() : IsOptional(),
    Length(USER_NAME_LENGTH.min, USER_NAME_LENGTH.max),
    Matches(USER_NAME_REGEX, {
      message: '$property contains not allowed symbols',
    }),
  ];
  if (swagger) {
    decorators.push(
      ApiProperty({
        required,
        minLength: USER_NAME_LENGTH.min,
        maxLength: USER_NAME_LENGTH.max,
      }),
    );
  }
  return applyDecorators(...decorators);
}
