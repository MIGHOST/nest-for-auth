import { json } from 'body-parser';
import helmet from 'helmet';

import {
  HttpException,
  HttpStatus,
  INestApplication,
  RequestMethod,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { ResultInterceptor } from './common/interceptors/result.interceptor';
import { validationErrorFactory } from './common/pipes/validation-exception-factory';

interface SetupNestAppOptions {
  app: INestApplication;
  title: string;
}

function setupNestApp({ app, title }: SetupNestAppOptions): void {
  app.use(helmet());

  app.use(json({ limit: '1mb' }));

  app.useGlobalFilters(new AllExceptionFilter());

  app.useGlobalInterceptors(new ResultInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: validationErrorFactory,
    }),
  );

  app.setGlobalPrefix('api', {
    exclude: [
      {
        path: '/health',
        method: RequestMethod.GET,
      },
      {
        path: '/',
        method: RequestMethod.GET,
      },
    ],
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const whitelist = process.env.CORS_LIST?.split(',') || [];
  app.enableCors({
    methods: ['GET', 'HEAD', 'PATCH', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      const getHost = (url) => {
        const matchString = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        if (matchString) {
          return matchString[1].split('.').slice(-2).join('.');
        } else {
          return null;
        }
      };

      if (whitelist.some((item) => getHost(item) === getHost(origin))) {
        callback(null, true);
      } else {
        callback(
          new HttpException(
            'Not allowed by CORS',
            HttpStatus.METHOD_NOT_ALLOWED,
          ),
        );
      }
    },
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  setupSwagger(app, title);
}

function setupSwagger(app: INestApplication, title: string): void {
  const swaggerOptions = new DocumentBuilder()
    .setTitle(title)
    .setDescription('API documentation')
    .addTag('Rest API')
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup('/docs', app, swaggerDoc);
}

export default setupNestApp;
