import { Container } from 'inversify';
import { Component } from '../../types/index.js';
import { DefaultUserService } from './default-user.service.js';
import { UserService } from './user-service.interface.js';
import { UserEntity, UserModel } from './user.entity.js';
import { types } from '@typegoose/typegoose';
import { Controller } from '../../libs/rest/index.js';
import { UserController } from './user.controller.js';

export const createUserContainer = () => {
  const userContainer = new Container();

  userContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  userContainer.bind<Controller>(Component.UserController).to(UserController).inSingletonScope();

  return userContainer;
};
