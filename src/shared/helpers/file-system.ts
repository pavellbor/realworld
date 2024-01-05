import { dirname } from 'node:path';
import { fileURLToPath } from 'url';

export function getCurrentModuleDirectoryPath(): string {
  const filePath = fileURLToPath(import.meta.url);
  return dirname(filePath);
}
