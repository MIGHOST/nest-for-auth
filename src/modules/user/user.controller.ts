import {
  Controller,
  Get,
  HttpException,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserVm } from './vm/user.vm';
import { UserService } from './user.service';
import { EmailParamDto } from './dto';

@ApiTags('users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('/:email')
  @ApiOperation({
    description: 'Get user by email',
  })
  @ApiParam({ type: String, name: 'email' })
  @ApiOkResponse({ type: UserVm })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiNotFoundResponse({ type: HttpException })
  @UseGuards(AuthGuard('jwt'))
  async getOne(@Param() { email }: EmailParamDto): Promise<UserVm> {
    return this.userService.getUserByEmail(email);
  }
}
