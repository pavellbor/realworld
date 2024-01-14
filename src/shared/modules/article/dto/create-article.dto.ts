import { ArticleType } from '../../../types/index.js';

export class CreateArticleDto {
  public title: string;
  public body: string;
  public postDate: Date;
  public image: string;
  public categories: string[];
  public type: ArticleType;
  public userId: string;
}
