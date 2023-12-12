import { BadRequestException } from '@nestjs/common';

export class UserIsAlreadyExistsException extends BadRequestException {
  constructor(email: string) {
    super(`User with email: ${email} is already exists`);
  }
}
