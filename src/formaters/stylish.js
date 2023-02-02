import _ from 'lodash';

const stringify = (data, replacer, depth) => {
  if (!_.isObject(data)) return `${data}`;
  const intend = replacer.repeat(depth + 1);
  const intendForBrecket = replacer.repeat(depth);
  const lines = Object.entries(data).map(([key, value]) => {
    const newDapth = depth + 1;
    return `${intend}${key}: ${stringify(value, replacer, newDapth)}`;
  });
  return ['{', ...lines, `${intendForBrecket}}`].join('\n');
};

const makeStylish = (data) => {
  const replacer = '    ';
  const iter = (tree, depth) => tree
    .map((node) => {
      const intend = replacer.repeat(depth);
      const intendForSign = intend.slice(2);
      switch (node.status) {
        case 'deleted':
          return `${intendForSign}- ${node.key}: ${stringify(node.value, replacer, depth)}`;
        case 'added':
          return `${intendForSign}+ ${node.key}: ${stringify(node.value, replacer, depth)}`;
        case 'notChanged':
          return `${intendForSign}  ${node.key}: ${stringify(node.value, replacer, depth)}`;
        case 'changed':
          return [
            `${intendForSign}- ${node.key}: ${stringify(node.value1, replacer, depth)}`,
            `${intendForSign}+ ${node.key}: ${stringify(node.value2, replacer, depth)}`,
          ].join('\n');
        case 'changedChildren':
          return `${intendForSign}  ${node.key}: ${['{', ...iter(node.value, depth + 1), `${intend}}`].join('\n')}`;
        default:
          throw new Error(`Type: ${node.status} is unknown.`);
      }
    });
  const stylish = iter(data, 1);
  return `${['{', ...stylish, '}'].join('\n')}`;
};

export default makeStylish;
