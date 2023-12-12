import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export abstract class CommonEntityUUIDIdentified extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
