import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

const getFileData = (fileName) => readFileSync(getFixturePath(fileName), 'utf-8');

const expected = getFileData('expected.txt');
const formatsFile = ['json', 'yml', 'yaml'];

test.each(formatsFile)('gen', (extension) => {
  const fileName1 = getFixturePath(`file1.${extension}`);
  const fileName2 = getFixturePath(`file2.${extension}`);
  const actual = genDiff(fileName1, fileName2);
  expect(actual).toBe(expected);
});
