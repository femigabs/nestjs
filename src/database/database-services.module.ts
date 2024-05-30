import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from './database.module';

@Module({
  imports: [MongoDataServicesModule],
  exports: [MongoDataServicesModule],
})
export class DataServicesModule {}
