import { ArticleType } from './article-type.enum';
import { Tag } from './tag.type';
import { User } from './user.type';

export type Article = {
  title: string;
  body: string;
  postDate: Date;
  image: string;
  tags: Tag[];
  type: ArticleType;
  author: User;
};
