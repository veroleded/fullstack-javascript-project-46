import gendiff from '../src';

test('1', () => {
  const expected = `{
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    + verbose: true
  }`;
  const actual = gendiff('../__fixtures__/file1.json', '../__fixtures__/file2.json');
  expect(actual).toBe(expected);
});
