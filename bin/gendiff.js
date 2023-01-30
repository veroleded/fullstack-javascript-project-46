#!/usr/bin/env node

import { program } from 'commander';
import gendiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filePath1> <filePath2>')
  .option('-f, --format <type>', 'output format')
  .action((filePath1, filePath2) => {
    console.log(gendiff(filePath1, filePath2));
  });
program.parse(process.argv);
