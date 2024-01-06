import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';

export class RestApplication {
  constructor(
    private readonly logger: Logger,
    private readonly config: Config<RestSchema>,
  ) {}

  public async init() {
    this.logger.info('Application initilization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
