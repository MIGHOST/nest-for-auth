import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenVm {
  @ApiProperty()
  token: string;

  @ApiProperty()
  refreshToken: string;
}
