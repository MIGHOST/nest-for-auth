import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/modules/user/entities/user.entity';
import { PasswordProviderService } from 'src/common/providers/password-provider.service';
import { UsersController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UserService],
  controllers: [UsersController],
  providers: [UserService, PasswordProviderService],
})
export class UserModule {}
