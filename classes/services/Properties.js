const PropertiesCache = require('./PropertiesCache')
const PropertiesItems = require('./PropertiesItems')
const PropertiesRead = require('./PropertiesRead')

const PropertiesToFull = require('./PropertiesToFull')
const PropertiesToLink = require('./PropertiesToLink')
const PropertiesToMulti = require('./PropertiesToMulti')
const PropertiesToRename = require('./PropertiesToRename')
const PropertiesToSub = require('./PropertiesToSub')
const PropertiesToVar = require('./PropertiesToVar')
const PropertiesToVariable = require('./PropertiesToVariable')

const PropertiesScss = require('./PropertiesScss')

const FILE_CACHE = 'properties'

/**
 * The main class for working with tokens
 *
 * Главный класс для работы с токенами
 */
module.exports = class Properties {
  /**
   * Constructor
   * @param {string[]} designs list of design names / список названий дизайнов
   */
  constructor (designs = undefined) {
    this.designs = designs || this.__getDesignsByEnv()
    this.items = new PropertiesItems(this.__init())
  }

  /**
   * Returns a PropertiesItems object for working with the list of properties
   *
   * Возвращает объект PropertiesItems для работы со списком свойств
   * @return {PropertiesItems}
   */
  get () {
    return this.items
  }

  /**
   * Getting structured data for use in an SCSS file
   *
   * Получение структурированных данных для работы в SCSS файле
   * @return {string}
   */
  getScss () {
    return new PropertiesScss(this.items).get()
  }

  /**
   * This method returns the names of designs from the environment variable (env)
   *
   * Данный метод возвращает названия дизайнов из переменной окружения (env)
   * @return {string[]}
   * @private
   */
  __getDesignsByEnv () {
    const designs = process.env.VUE_APP_DESIGNS
    return designs?.toString()?.split(',') || []
  }

  /**
   * Entry point for generating a file to work with data from JSON
   *
   * Точка входа для генерации файла для работы с данными из JSON
   * @return {Object<string, *>}
   * @private
   */
  __init () {
    return PropertiesCache.get([], FILE_CACHE, () => this.__initGo())
  }

  /**
   * Generating a base file for work
   *
   * Генерируется базовый файл для работы
   * @return {Object<string, *>}
   * @private
   */
  __initGo () {
    console.info('Properties: init')

    const read = new PropertiesRead(this.designs)
    const items = new PropertiesItems(read.get())

    const full = new PropertiesToFull(items)
    const rename = new PropertiesToRename(items)
    const sub = new PropertiesToSub(items)
    const value = new PropertiesToVar(items)
    const variable = new PropertiesToVariable(items)

    full.toFullValueFix()
    variable.to()
    variable.toByLink()
    sub.toByLink()

    new PropertiesToLink(items).to()

    full.toFullValue()
    full.toFullValueByDesign()
    variable.toByVar()
    sub.to()

    rename.to()
    new PropertiesToMulti(items).to()

    rename.toByVar()
    value.to()
    value.toImportant()

    rename.toByComponent()
    rename.toBySimilar()

    return items.get()
  }
}
