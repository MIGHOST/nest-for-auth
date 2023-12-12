import { Entity, ManyToOne } from 'typeorm';

import { UserEntity } from 'src/modules/user/entities/user.entity';
import { CommonEntityUUIDIdentified } from 'src/common/database/common.entity';

@Entity('sessions')
export class SessionEntity extends CommonEntityUUIDIdentified {
  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  user: UserEntity;
}
