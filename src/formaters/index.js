import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const choiceFormat = (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return makeStylish(data);
    case 'plain':
      return makePlain(data);
    case 'json':
      return makeJson(data);
    default:
      throw new Error('Incorrect format.');
  }
};

export default choiceFormat;
