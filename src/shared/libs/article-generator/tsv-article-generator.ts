import dayjs from 'dayjs';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers';
import { ArticleType, MockServerData } from '../../types';
import { ArticleGenerator } from './article-generator.interface';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVArticleGenerator implements ArticleGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const body = getRandomItem(this.mockData.bodies);
    const image = getRandomItem(this.mockData.images);
    const type = getRandomItem([(ArticleType.Private, ArticleType.Public)]);
    const categories = getRandomItems(this.mockData.categories).join(';');
    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY))
      .toISOString();
    const email = getRandomItem(this.mockData.emails);
    const username = getRandomItem(this.mockData.usernames);
    const avatar = getRandomItem(this.mockData.avatars);

    return [title, body, image, type, categories, createdDate, email, username, avatar].join('\t');
  }
}
