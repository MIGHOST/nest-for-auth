import { BadRequestException } from '@nestjs/common';

export class SignUpException extends BadRequestException {
  constructor(error: Error) {
    super(`Failed to sign-up user.Reason: ${error.message}`);
  }
}
