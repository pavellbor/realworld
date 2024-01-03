import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Article, ArticleType } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly fileName: string) {}

  public read(): void {
    this.rawData = readFileSync(this.fileName, { encoding: 'utf-8' });
  }

  public toArray(): Article[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\r\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, body, image, type, categories, createdDate, email, username, avatarPath]) => {
        return {
          title,
          body,
          postDate: new Date(createdDate),
          image,
          categories: categories.split(';').map((name) => ({ name })),
          type: ArticleType[type as 'Private' | 'Public'],
          author: {
            email,
            username,
            avatarPath,
          },
        };
      });
  }
}
