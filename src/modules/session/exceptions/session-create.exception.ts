import { BadRequestException } from '@nestjs/common';

export class SessionCreateException extends BadRequestException {
  constructor() {
    super('Failed to create session');
  }
}
