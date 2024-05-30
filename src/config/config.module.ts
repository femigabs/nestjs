import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().required(),
        API_HOST: Joi.string().required(),
        
        PAPERTRAIL_HOST: Joi.string().required(),
        PAPERTRAIL_PORT: Joi.number().required(),
        PAPERTRAIL_LOG_PROGRAM: Joi.string().required(),

        RABBITMQ_URL: Joi.string().required(),
        RABBITMQ_EXCHANGE: Joi.string().required(),
        RABBITMQ_TOPIC1: Joi.string().required(),
        RABBITMQ_TOPIC1_QUEUE: Joi.string().required(),
        REQRES_BASE_URL: Joi.string().default('https://reqres.in')
      }),
    }),
  ],
})
export class ConfigAppModule { }
