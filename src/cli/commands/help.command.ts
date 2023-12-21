import { Command } from './command.interface';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public execute(...parameters: string[]): void {
    console.info(`
      Программа для подготовки данных для REST API сервера.
      Пример:
          cli.js --<command> [--arguments]
      Команды:
          --version:                   # выводит номер версии
          --help:                      # печатает этот текст
          --import <path>:             # импортирует данные из TSV
          --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
    `);
  }
}
