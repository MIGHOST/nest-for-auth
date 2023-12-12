import { SessionEntity } from 'src/modules/session/entities/session.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export type JwtPayloadType = Pick<UserEntity, 'id'> & {
  sessionId: SessionEntity['id'];
  iat: number;
  exp: number;
};
