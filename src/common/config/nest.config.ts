import { EnvironmentSchema } from './environment-schema';

export const optionsConfig = {
  isGlobal: true,
  envFilePath: ['.env'],
  cache: true,
  validationSchema: EnvironmentSchema,
  load: [],
};
