import { BadRequestException } from '@nestjs/common';

export class InvalidUserCredentialsException extends BadRequestException {
  constructor() {
    super('Invalid email or password');
  }
}
