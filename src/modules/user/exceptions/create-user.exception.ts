import { InternalServerErrorException } from '@nestjs/common';

export class CreateUserException extends InternalServerErrorException {
  constructor() {
    super('Unable to create user');
  }
}
