import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';

import { PasswordProviderService } from 'src/common/providers/password-provider.service';
import { UserVmBuilder } from 'src/common/builders/user-vm.builder';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { InvalidUserCredentialsException } from 'src/modules/user/exceptions/invalid-user-credentials.exception';
import { UserVm } from 'src/modules/user/vm/user.vm';
import {
  UserIsAlreadyExistsException,
  CreateUserException,
  UserNotFoundException,
} from './exceptions';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly passwordProviderService: PasswordProviderService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserVm> {
    try {
      const { name, email, password } = dto;

      const isUserExist = await this.userRepository.findOneBy({ email });

      if (isUserExist) {
        throw new UserIsAlreadyExistsException(email);
      }

      const hashedPassword =
        this.passwordProviderService.hashPassword(password);

      const entity = await this.userRepository.save({
        name,
        email,
        password: hashedPassword,
      });

      return new UserVmBuilder(entity).build();
    } catch (error) {
      this.logger.error(error);
      switch (error.constructor) {
        case UserIsAlreadyExistsException:
          throw error;
        default:
          throw new CreateUserException();
      }
    }
  }

  async getUserByEmail(email: string): Promise<UserVm> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      this.logger.error('User did not find');
      throw new UserNotFoundException(email);
    }

    return new UserVmBuilder(user).build();
  }

  async validateUserCredentials({ email, password }: Partial<CreateUserDto>) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      this.logger.error('User did not find');
      throw new InvalidUserCredentialsException();
    }

    const isPasswordValid = this.passwordProviderService.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      this.logger.error('User passed invalid password');
      throw new InvalidUserCredentialsException();
    }

    return user;
  }
}
