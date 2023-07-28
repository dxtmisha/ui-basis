const Cache = require('./properties/PropertiesCache')
const Path = require('./properties/PropertiesPath')
const Items = require('./properties/PropertiesItems')

const ToLink = require('./properties/to/PropertiesToLink')
const ToPalette = require('./properties/to/PropertiesToPalette')
const ToReplace = require('./properties/to/PropertiesToReplace')
const ToSub = require('./properties/to/PropertiesToSub')
const ToVariable = require('./properties/to/PropertiesToVariable')

const ToSimilar = require('./properties/to/PropertiesToSimilar')
const ToMulti = require('./properties/to/PropertiesToMulti')
const ToStyle = require('./properties/to/PropertiesToStyle')

const ToComponent = require('./properties/to/PropertiesToComponent')
const ToProperty = require('./properties/to/PropertiesToProperty')
const ToState = require('./properties/to/PropertiesToState')
const ToSubclass = require('./properties/to/PropertiesToSubclass')
const ToVar = require('./properties/to/PropertiesToVar')
// const None = require('./properties/PropertiesToNone')

const ReadMain = require('./properties/read/PropertiesReadMain')
const ReadSettings = require('./properties/read/PropertiesReadSettings')

const PropertiesItems = require('./PropertiesItems')
const PropertiesRead = require('./PropertiesRead')
const PropertiesTool = require('./PropertiesTool')

const PropertiesToFull = require('./PropertiesToFull')
const PropertiesToLink = require('./PropertiesToLink')
const PropertiesToMulti = require('./PropertiesToMulti')
const PropertiesPalette = require('./PropertiesPalette')
const PropertiesToRename = require('./PropertiesToRename')
const PropertiesToReplace = require('./PropertiesToReplace')
const PropertiesToStyle = require('./PropertiesToStyle')
const PropertiesToSub = require('./PropertiesToSub')
const PropertiesToVar = require('./PropertiesToVar')
const PropertiesToVariable = require('./PropertiesToVariable')

const PropertiesScss = require('./PropertiesScss')
const { replaceRecursive } = require('../../functions/data')
const { To } = require('../To')

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
      new PropertiesPalette(this.items)
    ).get()
  }

  /**
   * Возвращает название файла для кэша. Это полный массив со всеми обработанными свойствами
   * @return {string}
   */
  getPathName () {
    return `${this.designs.join('-')}-${FILE_CACHE}`
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

    Cache.create([], `${this.designs.join('_')}_${FILE_CACHE}`, data)
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
    return Cache.get([], `${this.designs.join('_')}_${FILE_CACHE}`, () => this.__initGo())
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

    const properties = new Items(this.__getBasic())

    new ToReplace(properties).to()
    new ToPalette(properties).to()
    new ToLink(properties).to()
    new ToSub(properties).to()
    new ToVariable(properties).to()

    new ToSimilar(properties).to()
    new ToMulti(properties).to()
    new ToStyle(properties).to()

    new ToVar(properties).to()
    new ToProperty(properties).to()
    new ToComponent(properties).to()
    new ToState(properties).to()
    new ToSubclass(properties).to()

    const read = new PropertiesRead(this.designs)
    const items = new PropertiesItems(read.get())

    const full = new PropertiesToFull(items)
    const rename = new PropertiesToRename(items)
    const sub = new PropertiesToSub(items)
    const value = new PropertiesToVar(items)
    const variable = new PropertiesToVariable(items)

    full.toFullValueFix() // none
    variable.to() // ok
    variable.toByLink() // ok
    sub.toByLink() // none

    new PropertiesToLink(items).to() // ok
    variable.to() // ok

    new PropertiesPalette(items).to() // ok
    new PropertiesToReplace(items).to() // ok

    full.toFullValue() // none
    full.toFullValueByDesign() // none
    variable.toByVar() // ok
    sub.to() // ok

    value.toString() // none
    rename.to() // ok
    new PropertiesToMulti(items).to() // ok
    new PropertiesToStyle(items).to() // ok

    rename.toByVar() // ok
    value.toString() // none
    value.to() // ok

    value.toFull() // ok
    value.toImportant() // ok

    rename.toByComponent()
    rename.toBySimilar() // ok

    console.info('Properties: end')

    return items.get()
  }

  /**
   * Collects into an array from all files and returns the content without processing them
   *
   * Собирает в массив со всех файлов и возвращает содержимое не обрабатывая их
   * @return {Object<string, *>}
   * @private
   */
  __getBasic () {
    return Cache.get([], this.getPathName(), () => {
      const path = new Path(this.designs)

      return To.copy(
        replaceRecursive(
          new ReadSettings(path).get(),
          new ReadMain(path).get()
        )
      )
    })
  }
}
