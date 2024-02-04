import { DocumentType } from '@typegoose/typegoose';
import { ArticleEntity, CreateArticleDto, UpdateArticleDto } from './index.js';

export interface ArticleService {
  create(dto: CreateArticleDto): Promise<DocumentType<ArticleEntity>>;
  findById(articleId: string): Promise<DocumentType<ArticleEntity> | null>;
  find(): Promise<DocumentType<ArticleEntity>[]>;
  deleteById(articleId: string): Promise<DocumentType<ArticleEntity> | null>;
  updateById(articleId: string, dto: UpdateArticleDto): Promise<DocumentType<ArticleEntity> | null>;
  findByCategoryId(categoryId: string, count?: number): Promise<DocumentType<ArticleEntity>[]>;
  findNew(count: number): Promise<DocumentType<ArticleEntity>[]>;
  findDiscussed(count: number): Promise<DocumentType<ArticleEntity>[]>;
  exists(documentId: string): Promise<boolean>;
}
