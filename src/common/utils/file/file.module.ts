import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { AxiosService } from '../axios';

@Module({
  providers: [FileService, AxiosService],
  exports: [FileService, AxiosService],
})
export class FileModule {}
