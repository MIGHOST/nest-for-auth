import { BadRequestException } from '@nestjs/common';

export class SignInException extends BadRequestException {
  constructor() {
    super('Failed sing-in credentials');
  }
}
