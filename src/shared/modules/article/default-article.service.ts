import { DocumentType, types } from '@typegoose/typegoose';
import { ArticleEntity, ArticleService, CreateArticleDto, UpdateArticleDto } from './index.js';
import { inject, injectable } from 'inversify';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DEFAULT_ARTICLE_COUNT } from './article.constant.js';

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
    return this.articleModel.findById(articleId).populate(['userId', 'categories']).exec();
  }

  public async find(): Promise<DocumentType<ArticleEntity>[]> {
    return this.articleModel.find().populate(['userId', 'categories']).exec();
  }

  public async deleteById(articleId: string): Promise<DocumentType<ArticleEntity> | null> {
    return this.articleModel.findByIdAndDelete(articleId).exec();
  }

  public async updateById(
    articleId: string,
    dto: UpdateArticleDto,
  ): Promise<DocumentType<ArticleEntity> | null> {
    return this.articleModel
      .findByIdAndUpdate(articleId, dto, { new: true })
      .populate(['userId', 'categories'])
      .exec();
  }

  public async findByCategoryId(
    categoryId: string,
    count?: number | undefined,
  ): Promise<DocumentType<ArticleEntity>[]> {
    const limit = count ?? DEFAULT_ARTICLE_COUNT;
    return this.articleModel
      .find({ categories: categoryId }, {}, { limit })
      .populate(['userId', 'categories'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.findById(documentId)) !== null;
  }

  public async findNew(count: number): Promise<DocumentType<ArticleEntity>[]> {
    return this.articleModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(count)
      .populate(['userId', 'categories'])
      .exec();
  }

  public async findDiscussed(count: number): Promise<DocumentType<ArticleEntity>[]> {
    return this.articleModel
      .find()
      .sort({ commentCount: SortType.Down })
      .limit(count)
      .populate(['userId', 'categories'])
      .exec();
  }
}
