import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { SessionService } from 'src/modules/session/session.service';
import { Environment } from 'src/common/config/environment.enum';
import { JwtPayloadType } from '../types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly sessionService: SessionService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(Environment.JWT_SECRET),
    });
  }

  public async validate(payload: JwtPayloadType) {
    const session = await this.sessionService.validateSession(
      payload.sessionId,
    );

    if (!session) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
