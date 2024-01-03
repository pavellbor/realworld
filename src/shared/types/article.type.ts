import { ArticleType } from './article-type.enum.js';
import { Category } from './category.type.js';
import { User } from './user.type.js';

export type Article = {
  title: string;
  body: string;
  postDate: Date;
  image: string;
  categories: Category[];
  type: ArticleType;
  author: User;
};
