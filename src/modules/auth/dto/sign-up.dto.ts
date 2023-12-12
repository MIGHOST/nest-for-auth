import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { SignInDto } from './sign-in.dto';

export class SignUpDto extends SignInDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
