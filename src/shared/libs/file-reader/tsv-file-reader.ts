import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly fileName: string) {}

  public read(): void {
    this.rawData = readFileSync(this.fileName, { encoding: 'utf-8' });
  }
}
