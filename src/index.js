import buildTree from './buildTree.js';
import parse from './parsers.js';
import choiceFormat from './formaters/index.js';

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const data1 = parse(filePath1);
  const data2 = parse(filePath2);
  const tree = buildTree(data1, data2);
  return choiceFormat(tree, formatName);
};

export default genDiff;
