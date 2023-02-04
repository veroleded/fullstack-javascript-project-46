import _ from 'lodash';

const getValue = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  return _.isString(data) ? `'${data}'` : `${data}`;
};

const makePlain = (data) => {
  if (!_.isArray) return `${data}`;
  const iter = (tree, valuePath = '') => {
    const lines = tree.flatMap((node) => {
      const nextValuePath = `${valuePath}${node.key}.`;
      switch (node.status) {
        case 'deleted':
          return `Property '${valuePath}${node.key}' was removed`;
        case 'added':
          return `Property '${valuePath}${node.key}' was added with value: ${getValue(node.value)}`;
        case 'changed':
          return `Property '${valuePath}${node.key}' was updated. From ${getValue(node.firstFileValue)} to ${getValue(node.secondFileValue)}`;
        case 'changedChildren':
          return iter(node.value, nextValuePath);
        case 'notChanged':
          return [];
        default:
          throw new Error(`Type: ${node.status} is unknown.`);
      }
    });
    return lines.join('\n');
  };
  return iter(data);
};

export default makePlain;
