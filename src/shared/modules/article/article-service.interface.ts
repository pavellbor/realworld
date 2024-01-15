import { DocumentType } from '@typegoose/typegoose';
import { ArticleEntity, CreateArticleDto } from './index.js';

export interface ArticleService {
  create(dto: CreateArticleDto): Promise<DocumentType<ArticleEntity>>;
  findById(articleId: string): Promise<DocumentType<ArticleEntity> | null>;
}
