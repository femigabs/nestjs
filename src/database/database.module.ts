import { Module } from '@nestjs/common';
import { MongooseModule  } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoDataServices } from './mongo.services';
import { IDataServices } from './data-services.abstract';
import { User, USERSCHEMA, UserAvatar, USERAVATARSCHEMA } from './models';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: User.name, schema: USERSCHEMA },
      { name: UserAvatar.name, schema: USERAVATARSCHEMA },
    ]),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');

        return {
          uri: databaseUrl,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}
