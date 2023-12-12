import * as Joi from 'joi';

export const EnvironmentSchema = Joi.object({
  PORT: Joi.number().required().default(8080),
  RDS_NAME: Joi.string().required(),
  RDS_DB: Joi.string().required(),
  RDS_HOST: Joi.string().required(),
  RDS_PORT: Joi.number().required(),
  RDS_USERNAME: Joi.string().required(),
  RDS_PASSWORD: Joi.string().required(),
  TYPEORM_LOGGING: Joi.boolean().required(),
  TYPEORM_SYNCHRONIZE: Joi.boolean().required(),
  CORS_LIST: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRED_TIME: Joi.number().required(),
});
