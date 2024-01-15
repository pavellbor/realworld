import { DocumentType, defaultClasses, types } from '@typegoose/typegoose';
import { ArticleEntity, ArticleService, CreateArticleDto } from './index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';

@injectable()
export class DefaultArticleService implements ArticleService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.ArticleModel) private readonly articleModel: types.ModelType<ArticleEntity>,
  ) {}

  public async create(dto: CreateArticleDto): Promise<DocumentType<ArticleEntity>> {
    const result = await this.articleModel.create(dto);

    this.logger.info(`New article create: ${result.title}`);

    return result;
  }

  public async findById(articleId: string): Promise<DocumentType<ArticleEntity> | null> {
    return this.articleModel.findById(articleId).exec();
  }
}
