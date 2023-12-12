import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { SessionService } from '../session/session.service';
import { UserVm } from '../user/vm/user.vm';
import { TokenPayload } from './interfaces/common.interfaces';
import {
  SignUpException,
  SignInException,
  SignOutException,
} from './exceptions';
import { SignInVm, SignOutVm } from './vm';
import { SignUpDto, SignInDto } from './dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto): Promise<UserVm> {
    try {
      const user = await this.userService.createUser(dto);
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new SignUpException(error);
    }
  }

  async signIn(dto: SignInDto): Promise<SignInVm> {
    try {
      const existingUser = await this.userService.validateUserCredentials(dto);

      const session = await this.sessionService.createSession(existingUser);

      const { token, refreshToken } = await this.generateToken({
        id: existingUser.id,
        email: existingUser.email,
        sessionId: session.id,
      });

      return {
        token,
        refreshToken,
        user: existingUser,
      };
    } catch (error) {
      this.logger.error(error);
      throw new SignInException();
    }
  }

  async signOut(sessionId: string): Promise<SignOutVm> {
    try {
      await this.sessionService.removeSession({ id: sessionId });

      return { message: 'User successfully signed out.' };
    } catch (error) {
      this.logger.error(error);
      throw new SignOutException(error);
    }
  }

  async generateToken(payload: TokenPayload) {
    const { id, email, sessionId } = payload;

    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync({
        id,
        email,
        sessionId,
      }),
      this.jwtService.signAsync({ sessionId }),
    ]);

    return { token, refreshToken };
  }
}
