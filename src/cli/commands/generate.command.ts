import { Command } from './command.interface';

export class GenerateCommand implements Command {
  public getName(): string {
    return '--generate';
  }

  public execute(...parameters: string[]): void {
    const [count, filepath, url] = parameters;
    const articleCount = Number.parseInt(count, 10);

    // Код для получения данных с сервера
    // Формирование постов
  }
}
