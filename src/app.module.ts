import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService, UserModule } from './services';
import { UserController } from './controllers/user.controller';
import { CustomRabbitMQModule, ConfigAppModule } from './config';
import { DataServicesModule } from './database';
import { ResponseService, HttpExceptionFilter, AxiosModule, FileModule, FileService } from './common';
import { WinstonModule } from 'nest-winston';
import { CustomLoggerService } from './config';


@Module({
  imports: [
    DataServicesModule,
    ConfigAppModule,
    CustomRabbitMQModule,
    AxiosModule,
    FileModule,
    UserModule
  ],
  controllers: [
    AppController, 
    UserController
  ],
  providers: [
    AppService,
    UserService,
    ResponseService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
