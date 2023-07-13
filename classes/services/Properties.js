const PropertiesCache = require('./PropertiesCache')
const PropertiesItems = require('./PropertiesItems')
const PropertiesRead = require('./PropertiesRead')
const PropertiesTool = require('./PropertiesTool')

const PropertiesToFull = require('./PropertiesToFull')
const PropertiesToLink = require('./PropertiesToLink')
const PropertiesToMulti = require('./PropertiesToMulti')
const PropertiesPalette = require('./PropertiesPalette')
const PropertiesToRename = require('./PropertiesToRename')
const PropertiesToStyle = require('./PropertiesToStyle')
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
   * @param {boolean} cache enabling caching / включение кэширования
   * @param {string[]} designs list of design names / список названий дизайнов
   */
  constructor (
    cache = true,
    designs = undefined
  ) {
    this.cache = cache
    this.designs = ['d', ...(designs || PropertiesTool.getDesignsByEnv())]
    this.items = new PropertiesItems(
      cache ? this.__initCache() : this.__init()
    )

    this.palette = new PropertiesPalette(this.items)
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
    return new PropertiesScss(
      this.items,
      this.palette
    ).get()
  }

  /**
   * Entry point for generating a file to work with data from JSON
   *
   * Точка входа для генерации файла для работы с данными из JSON
   * @return {Object<string, *>}
   * @private
   */
  __init () {
    const data = this.__initGo()

    PropertiesCache.create([], `${this.designs.join('_')}_${FILE_CACHE}`, data)
    return data
  }

  /**
   * Entry point for generating a file to work with data from JSON (caching)
   *
   * Точка входа для генерации файла для работы с данными из JSON (кеширование)
   * @return {Object<string, *>}
   * @private
   */
  __initCache () {
    return PropertiesCache.get([], `${this.designs.join('_')}_${FILE_CACHE}`, () => this.__initGo())
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
    variable.to()

    full.toFullValue()
    full.toFullValueByDesign()
    variable.toByVar()
    sub.to()

    value.toString()
    rename.to()
    new PropertiesToMulti(items).to()
    new PropertiesToStyle(items).to()
    new PropertiesPalette(items).to()

    rename.toByVar()
    value.toString()
    value.to()

    value.toFull()
    value.toImportant()

    rename.toByComponent()
    rename.toBySimilar()

    return items.get()
  }
}
