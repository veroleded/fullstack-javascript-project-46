import { readFileSync } from 'node:fs';
import path, { extname } from 'node:path';
import buildTree from './buildTree.js';
import parse from './parsers.js';
import makeStylish from './formaters/stylish.js';

const getAbsPath = (filePath) => path.resolve(process.cwd(), filePath);
const getFileData = (filePath) => readFileSync(getAbsPath(filePath), 'utf-8');

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const data1 = parse(getFileData(filePath1), extname(filePath1));
  const data2 = parse(getFileData(filePath2), extname(filePath2));
  const tree = buildTree(data1, data2);
  switch (format) {
    case 'stylish':
      return makeStylish(tree);
    default:
      throw new Error('Incorrect format.');
  }
};

export default genDiff;
