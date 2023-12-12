import { DeepPartial, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { SessionEntity } from './entities/session.entity';
import { SessionRemoveException, SessionCreateException } from './exceptions';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
  ) {}

  async createSession(
    data: DeepPartial<SessionEntity>,
  ): Promise<SessionEntity> {
    try {
      return this.sessionRepository.save(data);
    } catch (error) {
      throw new SessionCreateException();
    }
  }

  async validateSession(id: string): Promise<boolean> {
    const session = await this.sessionRepository.findOne({ where: { id } });

    return !!session;
  }

  async removeSession(criteria: Partial<SessionEntity>): Promise<void> {
    try {
      await this.sessionRepository.delete(criteria);
    } catch (error) {
      throw new SessionRemoveException();
    }
  }
}
