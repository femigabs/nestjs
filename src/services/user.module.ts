import { Module } from '@nestjs/common';
import { UserService } from './index';
import { DataServicesModule } from '../database';
import { ResponseService, HelperService, AxiosService, FileService } from '../common';
import { CustomRabbitMQModule } from '../config';

@Module({
  imports: [DataServicesModule, CustomRabbitMQModule],
  providers: [UserService, ResponseService, HelperService, AxiosService, FileService],
  exports: [UserService, ResponseService, HelperService, AxiosService, FileService],
})
export class UserModule {}