import { BadRequestException } from '@nestjs/common';

export class SessionRemoveException extends BadRequestException {
  constructor() {
    super('Failed to remove session');
  }
}
