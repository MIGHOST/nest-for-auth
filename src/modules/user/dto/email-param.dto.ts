import { Transform } from 'class-transformer';

import { ValidateEmailAddress } from 'src/common/validation-decorators';

export class EmailParamDto {
  @ValidateEmailAddress()
  @Transform(({ value }) => value.toLowerCase())
  email: string;
}
