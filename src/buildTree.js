import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);
  const sortKeys = _.sortBy(keys);
  const result = sortKeys.map((key) => {
    if (!Object.hasOwn(data2, key)) {
      return { key, status: 'deleted', value: data1[key] };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, status: 'added', value: data2[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key, status: 'changedChildren', value: buildTree(data1[key], data2[key]),
      };
    }
    return data1[key] === data2[key]
      ? { key, status: 'notChanged', value: data2[key] }
      : {
        key, status: 'changed', value1: data1[key], value2: data2[key],
      };
  });
  return result;
};
export default buildTree;
