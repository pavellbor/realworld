import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication, createRestApplicationContainer } from './rest/index.js';
import { Component } from './shared/types/index.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createCategoryContainer } from './shared/modules/category/category.container.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createCategoryContainer(),
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
