import { Container } from 'inversify';
import { Component } from '../../types/index.js';
import { ArticleEntity, ArticleModel } from './article.entity.js';
import { types } from '@typegoose/typegoose';
import { ArticleService } from './index.js';
import { DefaultArticleService } from './default-article.service.js';

export const createArticleContainer = () => {
  const articleContainer = new Container();

  articleContainer
    .bind<types.ModelType<ArticleEntity>>(Component.ArticleModel)
    .toConstantValue(ArticleModel);
  articleContainer.bind<ArticleService>(Component.ArticleService).to(DefaultArticleService);

  return articleContainer;
};
