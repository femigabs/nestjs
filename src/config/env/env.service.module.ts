import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigService } from './env.service';
import { IConfigService } from './env.abstract';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  providers: [
    {
      provide: IConfigService,
      useClass: EnvConfigService,
    },
  ],
  exports: [IConfigService],
})
export class EnvConfigModule {}
