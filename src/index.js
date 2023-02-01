import _ from 'lodash';
import { readFileSync } from 'node:fs';
import path, { extname } from 'node:path';
import parse from './parsers.js';

const getAbsPath = (filePath) => path.resolve(process.cwd(), filePath);
const getFileData = (filePath) => readFileSync(getAbsPath(filePath), 'utf-8');

const genDiff = (filePath1, filePath2) => {
  const data1 = parse(getFileData(filePath1), extname(filePath1));
  const data2 = parse(getFileData(filePath2), extname(filePath2));
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);
  const sortKeys = _.sortBy(keys);
  const result = sortKeys.reduce((acc, key) => {
    let newAcc;
    if (!Object.hasOwn(data2, key)) {
      newAcc = [`  - ${key}: ${data1[key]}`];
    } else if (!Object.hasOwn(data1, key)) {
      newAcc = [`  + ${key}: ${data2[key]}`];
    } else {
      newAcc = data1[key] === data2[key]
        ? [`    ${key}: ${data1[key]}`]
        : [`  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`];
    }
    return [...acc, ...newAcc];
  }, []);
  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
