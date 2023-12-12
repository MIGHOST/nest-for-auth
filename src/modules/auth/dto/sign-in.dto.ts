import { IsNotEmpty, IsString, Length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import {
  EMAIL_LENGTH,
  PASSWORD_LENGTH,
} from 'src/common/constants/common.constants';

export class SignInDto {
  @ApiProperty({ minLength: EMAIL_LENGTH.min, maxLength: EMAIL_LENGTH.max })
  @IsNotEmpty()
  @Length(EMAIL_LENGTH.min, EMAIL_LENGTH.max)
  email: string;

  @ApiProperty({
    minLength: PASSWORD_LENGTH.min,
    maxLength: PASSWORD_LENGTH.max,
  })
  @IsString()
  @IsNotEmpty()
  @Length(PASSWORD_LENGTH.min, PASSWORD_LENGTH.max)
  password: string;
}
