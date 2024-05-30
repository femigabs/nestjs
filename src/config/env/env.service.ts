/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfigService } from './env.abstract';
import { MainAPI } from './types';

@Injectable()
export class EnvConfigService extends ConfigService implements IConfigService {
  constructor() {
    super();
  }
  mongodb = {
    connectionString: this.get('MONGO_CONNECTION_STRING'),
  };

  ENV = this.get('NODE_ENV') || 'development';

  // should contain all main api specific env variables
  mainAPI = {
    port: this.get<number>(MainAPI.PORT),
  };

}
