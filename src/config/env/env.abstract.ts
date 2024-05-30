/* eslint-disable @typescript-eslint/naming-convention */
import { MainAPIEnvironment } from './types';

export abstract class IConfigService {
  ENV: string;

  mongodb: {
    connectionString: string;
  };

  mainAPI: MainAPIEnvironment;

}
