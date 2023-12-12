import { Column, Entity, OneToMany } from 'typeorm';

import { CommonEntityUUIDIdentified } from 'src/common/database/common.entity';
import { SessionEntity } from 'src/modules/session/entities/session.entity';

@Entity('users')
export class UserEntity extends CommonEntityUUIDIdentified {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];
}
