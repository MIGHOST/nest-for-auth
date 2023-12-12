import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordProviderService {
  public hashPassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  public validatePassword(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }
}
