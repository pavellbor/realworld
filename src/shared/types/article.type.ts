import { ArticleType } from './article-type.enum';
import { Category } from './category.type';
import { User } from './user.type';

export type Article = {
  title: string;
  body: string;
  postDate: Date;
  image: string;
  categories: Category[];
  type: ArticleType;
  author: User;
};
