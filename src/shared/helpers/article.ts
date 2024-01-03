import { Article } from '../types/article.type.js';
import { ArticleType } from '../types/index.js';

export function createArticle(articleData: string): Article {
  const [title, body, image, type, categories, createdDate, email, username, avatarPath] =
    articleData.replace('\n', '').split('\t');

  const author = {
    email,
    username,
    avatarPath,
  };

  return {
    title,
    body,
    postDate: new Date(createdDate),
    image,
    categories: categories.split(';').map((name) => ({ name })),
    type: ArticleType[type as 'Private' | 'Public'],
    author,
  };
}
