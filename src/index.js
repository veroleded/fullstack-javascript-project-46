import _ from 'lodash';
import getData from './getFileData.js';

const gendiff = (file1, file2) => {
  const data1 = getData(file1);
  const data2 = getData(file2);
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);
  const sortKeys = _.sortBy(keys);
  const result = sortKeys.reduce((acc, key) => {
    let newAcc;
    if (!Object.hasOwn(data2, key)) {
      newAcc = [`  - ${key}: ${data1[key]}`];
    } else if (!Object.hasOwn(data1, key)) {
      newAcc = [`  + ${key}: ${data2[key]}`];
    } else {
      newAcc = data1[key] === data2[key]
        ? [`    ${key}: ${data1[key]}`]
        : [`  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`];
    }
    return [...acc, ...newAcc];
  }, []);
  return `{ \n${result.join('\n')}\n} `;
};

export default gendiff;
