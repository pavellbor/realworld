import { fileURLToPath } from 'url';
import { RestApplication } from './rest/indext.js';
import { PinoLogger } from './shared/libs/logger/index.js';
import { dirname } from 'node:path';

async function bootstrap() {
  const logger = new PinoLogger();

  const application = new RestApplication(logger);
  await application.init();

  console.log(dirname(fileURLToPath(import.meta.url)));
}

bootstrap();
