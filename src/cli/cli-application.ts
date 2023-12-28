import { CommandParser } from './command-parser';
import { Command } from './commands/command.interface';

type CommandCollection = Record<string, Command>;

export class CLIApplication {
  private commands: CommandCollection = {};

  constructor(private readonly defaultCommand: string = '--help') {}

  private getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  private getDefaultCommand(): Command | never {
    if (!this.commands[this.defaultCommand]) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered.`);
    }

    return this.commands[this.defaultCommand];
  }

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      const commandName = command.getName();

      if (Object.hasOwn(this.commands, commandName)) {
        throw new Error(`Command ${commandName} is already registered`);
      }

      this.commands[commandName] = command;
    });
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] || [];

    command.execute(...commandArguments);
  }
}
