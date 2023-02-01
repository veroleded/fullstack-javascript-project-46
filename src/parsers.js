import { load } from 'js-yaml';

const parse = (filePath, format) => {
  switch (format) {
    case '.json':
    case '':
      return JSON.parse(filePath);
    case '.yml':
    case '.yaml':
      return load(filePath);
    default:
      throw new Error('Invalid file format! Try supported formats. Use the "-f" or "--format" option to find out the available formats.');
  }
};
export default parse;
