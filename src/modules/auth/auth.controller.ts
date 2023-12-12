import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpStatus,
  HttpException,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserVm } from '../user/vm/user.vm';
import { AuthService } from './auth.service';
import { AuthRequest } from './interfaces/common.interfaces';
import { SignInVm, SignOutVm } from './vm';
import { SignUpDto, SignInDto } from './dto';

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ description: 'Sign-up a user' })
  @ApiBody({ type: SignUpDto })
  @ApiOkResponse({ type: UserVm })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiNotFoundResponse({ type: HttpException })
  async signUp(@Body() dto: SignUpDto): Promise<UserVm> {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  @ApiOperation({ description: 'Sign-in a user' })
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ type: SignInVm })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiNotFoundResponse({ type: HttpException })
  async signIn(@Body() dto: SignInDto): Promise<SignInVm> {
    return this.authService.signIn(dto);
  }

  @ApiBearerAuth()
  @Post('signout')
  @ApiOperation({ description: 'Sign-out a user' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ status: HttpStatus.OK })
  @ApiOkResponse({ type: SignOutVm })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiNotFoundResponse({ type: HttpException })
  async signOut(@Req() req: AuthRequest): Promise<SignOutVm> {
    return this.authService.signOut(req.user.sessionId);
  }
}
