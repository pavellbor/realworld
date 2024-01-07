import { inject, injectable } from 'inversify';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {}

  public async init() {
    this.logger.info('Application initilization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info(`Get value from env $SALT: ${this.config.get('SALT')}`);
    this.logger.info(`Get value from env $DB_HOST: ${this.config.get('DB_HOST')}`);
  }
}
