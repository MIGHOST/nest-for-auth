import { join } from 'path';

import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Environment } from './environment.enum';

export const typeormConfigFactory = (configService: ConfigService) => {
  return {
    type: 'postgres',
    name: configService.get(Environment.RDS_NAME),
    logging: configService.get(Environment.TYPEORM_LOGGING),
    host: configService.get(Environment.RDS_HOST),
    port: configService.get(Environment.RDS_PORT),
    username: configService.get(Environment.RDS_USERNAME),
    password: String(configService.get(Environment.RDS_PASSWORD)),
    database: configService.get(Environment.RDS_DB),
    dropSchema: false,
    synchronize: configService.get(Environment.TYPEORM_SYNCHRONIZE),
    keepConnectionAlive: true,
    autoLoadEntities: true,
    migrationsRun: false,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: [join(__dirname, '..', '/database/migrations/*.{js,ts}')],
  } as TypeOrmModuleOptions;
};
