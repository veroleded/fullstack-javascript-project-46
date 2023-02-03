import makeStylish from './stylish.js';
import plain from './plain.js';

const choiceFormat = (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return makeStylish(data);
    case 'plain':
      return plain(data);
    default:
      throw new Error('Incorrect format.');
  }
};

export default choiceFormat;
