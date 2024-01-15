import { createArticle, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { ConsoleLogger, Logger } from '../../shared/libs/logger/index.js';
import {
  ArticleModel,
  ArticleService,
  DefaultArticleService,
} from '../../shared/modules/article/index.js';
import {
  CategoryModel,
  CategoryService,
  DefaultCategoryService,
} from '../../shared/modules/category/index.js';
import { DefaultUserService, UserModel, UserService } from '../../shared/modules/user/index.js';
import { Article } from '../../shared/types/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private categoryService: CategoryService;
  private articleService: ArticleService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.articleService = new DefaultArticleService(this.logger, ArticleModel);
    this.categoryService = new DefaultCategoryService(this.logger, CategoryModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void): Promise<void> {
    const article = createArticle(line);
    await this.saveArticle(article);
    resolve();
  }

  private onCompleteImport(count: number): void {
    console.info(`${count} was imported`);
    this.databaseClient.disconnect();
  }

  private async saveArticle(article: Article): Promise<void> {
    const categories: string[] = [];
    const user = await this.userService.findOrCreate(
      {
        ...article.author,
        password: DEFAULT_USER_PASSWORD,
      },
      this.salt,
    );

    for (const { name } of article.categories) {
      const existCategory = await this.categoryService.findByCategoryNameOrCreate(name, { name });
      categories.push(existCategory.id);
    }

    await this.articleService.create({
      categories,
      userId: user.id,
      title: article.title,
      body: article.body,
      image: article.image,
      postDate: article.postDate,
      type: article.type,
    });
  }

  public getName(): string {
    return '--import';
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string,
    salt: string,
  ): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (err) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(err));
    }
  }
}
