import _ from 'lodash';

const getValue = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  return _.isString(data) ? `'${data}'` : `${data}`;
};

const plain = (tree) => {
  if (!_.isArray) return `${tree}`;
  const iter = (data, valuePath = '') => {
    const lines = data.flatMap((node) => {
      const nextValuePath = `${valuePath}${node.key}.`;
      switch (node.status) {
        case 'deleted':
          return `Property '${valuePath}${node.key}' was removed`;
        case 'added':
          return `Property '${valuePath}${node.key}' was added with value: ${getValue(node.value)}`;
        case 'changed':
          return `Property '${valuePath}${node.key}' was updated. From ${getValue(node.value1)} to ${getValue(node.value2)}`;
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
  return iter(tree);
};

export default plain;
