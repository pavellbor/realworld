import got from 'got';
import { Command } from './command.interface.js';
import { MockServerData } from '../../shared/types/index.js';
import { TSVArticleGenerator } from '../../shared/libs/article-generator/index.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  private async load(url: string): Promise<void> {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, articleCount: number): Promise<void> {
    const tsvArticleGenerator = new TSVArticleGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < articleCount; i++) {
      await tsvFileWriter.write(tsvArticleGenerator.generate());
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const articleCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, articleCount);

      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error("Can't generate data");
      console.error(getErrorMessage(error));
    }
  }
}
