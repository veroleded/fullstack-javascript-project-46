import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

const getFileData = (fileName) => readFileSync(getFixturePath(fileName), 'utf-8');

const expectedStylish = getFileData('stylish.txt');
const expectedPlain = getFileData('plain.txt');
const expectedJson = getFileData('json.txt');
const formatsFile = ['json', 'yml', 'yaml'];

test.each(formatsFile)('gen', (extension) => {
  const fileName1 = getFixturePath(`file1.${extension}`);
  const fileName2 = getFixturePath(`file2.${extension}`);
  const actualStylish = genDiff(fileName1, fileName2);
  const actualPlain = genDiff(fileName1, fileName2, 'plain');
  const actualJson = genDiff(fileName1, fileName2, 'json');
  expect(actualStylish).toBe(expectedStylish);
  expect(actualPlain).toBe(expectedPlain);
  expect(actualJson).toBe(expectedJson);
});
