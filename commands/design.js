#!/usr/bin/env node

const { program } = require('commander')

const DesignComponent = require('../classes/services/DesignComponent')
const DesignConstructor = require('../classes/services/DesignConstructor')

require('dotenv').config()

program
  .command('component <name>')
  .description('Adding or updating a component in accordance with design tokens\r\nДобавление или обновление компонента в соответствии с дизайн-токенами')
  .option('-c, --constr', 'together a constructor is created / вместе создается и конструктор')
  .option('-o, --options', 'returns a classic template / возвращает классический шаблон')
  .action((name, options) => new DesignComponent(name, options).init())

program
  .command('constructor <name>')
  .description('Adding a new constructor\r\nДобавление нового конструктора')
  .action((name, options) => new DesignConstructor(name, options).init())

program.parse(process.argv)
