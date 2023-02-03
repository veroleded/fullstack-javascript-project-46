import { load } from 'js-yaml';
import path, { extname } from 'node:path';
import { readFileSync } from 'node:fs';

const getAbsPath = (filePath) => path.resolve(process.cwd(), filePath);
const getFileData = (filePath) => readFileSync(getAbsPath(filePath), 'utf-8');

const parse = (filePath) => {
  const format = extname(filePath);
  const fileData = getFileData(filePath);
  switch (format) {
    case '.json':
    case '':
      return JSON.parse(fileData);
    case '.yml':
    case '.yaml':
      return load(fileData);
    default:
      throw new Error('Invalid file format! Try supported formats. Use the "-f" or "--format" option to find out the available formats.');
  }
};
export default parse;
