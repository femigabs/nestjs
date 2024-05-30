import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { PapertrailTransport } from 'winston-papertrail';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info', // Set default logging level
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
      transports: [
        new winston.transports.Console(),
        // new PapertrailTransport({
        //   host: process.env.PAPERTRAIL_HOST,
        //   port: parseInt(process.env.PAPERTRAIL_PORT, 10),
        //   logFormat: (level, message) => `[${level}] ${message}`,
        //   colorize: true,
        // })
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(`${message} - ${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
