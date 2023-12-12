import { ApiProperty } from '@nestjs/swagger';

import { AuthTokenVm } from './auth-tokens.vm';
import { UserVm } from '../../user/vm/user.vm';

export class SignInVm extends AuthTokenVm {
  @ApiProperty({ type: UserVm })
  user: UserVm;
}
