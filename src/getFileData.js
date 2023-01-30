import process from 'node:process';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const getData = (file) => {
  const absPath = path.resolve(process.cwd(), file);
  const datastr = readFileSync(absPath, 'utf-8');
  const data = JSON.parse(datastr);
  return data;
};
export default getData;
