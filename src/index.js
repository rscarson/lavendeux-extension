#! /usr/bin/env node

const { program } = require('commander');
const init = require('./init');
const test = require('./test');
const build = require('./build');

program
    .command('init <name>')
    .description('Initialize a new extension')
    .action(init);
program
    .command('test')
    .description('Test the extension')
    .action(test);
program
    .command('build')
    .description('Compile the extension')
    .action(build);
program.parse();
