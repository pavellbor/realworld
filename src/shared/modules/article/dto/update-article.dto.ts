import { ArticleType } from '../../../types/article-type.enum.js';

export class UpdateArticleDto {
  public title?: string;
  public body?: string;
  public image?: string;
  public categories?: string[];
  public type?: ArticleType;
}
