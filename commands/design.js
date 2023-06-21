#!/usr/bin/env node

const { program } = require('commander')

const DesignComponent = require('../classes/services/DesignComponent')

require('dotenv').config()

program
  .command('component <name>')
  .description('Adding or updating a component in accordance with design tokens\r\nДобавление или обновление компонента в соответствии с дизайн-токенами')
  .option('-c, --create', 'only creating files if they are absent / только создание файлов, если они отсутствуют')
  .option('-u, --update', 'only updating existing data / только обновление существующих данных')
  .action((name, options) => new DesignComponent(name, options).init())

program.parse(process.argv)
