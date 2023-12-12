import { DataSource } from 'typeorm';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HealthModule } from './modules/health/health.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SessionModule } from './modules/session/session.module';
import { optionsConfig, typeormConfigFactory } from './common/config';

@Module({
  imports: [
    ConfigModule.forRoot(optionsConfig),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeormConfigFactory,
      dataSourceFactory: async (options) => {
        return new DataSource(options).initialize();
      },
    }),
    HealthModule,
    AuthModule,
    UserModule,
    SessionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
