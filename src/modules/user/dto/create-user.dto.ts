import { IsString, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';
import {
  PASSWORD_LENGTH,
  PASSWORD_PATTERN,
} from 'src/common/constants/common.constants';
import {
  UserName,
  ValidateEmailAddress,
} from 'src/common/validation-decorators';

export class CreateUserDto {
  @UserName()
  name: string;

  @ValidateEmailAddress()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({
    minLength: PASSWORD_LENGTH.min,
    maxLength: PASSWORD_LENGTH.max,
  })
  @IsString()
  @Length(PASSWORD_LENGTH.min, PASSWORD_LENGTH.max)
  @Matches(PASSWORD_PATTERN, {
    message:
      '$property must contains at least 1 upper case letter, 1 lower case letter, 1 number, and 1 special symbol',
  })
  password: string;
}
