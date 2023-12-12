import { BadRequestException } from '@nestjs/common';

export class SignOutException extends BadRequestException {
  constructor(error: Error) {
    super(`Failed to sign-out user.Reason: ${error.message}`);
  }
}
