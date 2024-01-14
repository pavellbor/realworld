import { Container } from 'inversify';
import { Component } from '../../types/index.js';
import { CategoryEntity, CategoryModel } from './category.entity.js';
import { types } from '@typegoose/typegoose';
import { CategoryService } from './category-service.inteface.js';
import { DefaultCategoryService } from './default-category.service.js';

export const createCategoryContainer = () => {
  const categoryContainer = new Container();

  categoryContainer
    .bind<types.ModelType<CategoryEntity>>(Component.CategoryModel)
    .toConstantValue(CategoryModel);
  categoryContainer.bind<CategoryService>(Component.CategoryService).to(DefaultCategoryService);

  return categoryContainer;
};
