const Cache = require('./PropertiesCache')
const Path = require('./PropertiesPath')
const Items = require('./PropertiesItems')

const ReadMain = require('./read/PropertiesReadMain')
const ReadSettings = require('./read/PropertiesReadSettings')
const Scss = require('./PropertiesScss')

const ToLink = require('./to/PropertiesToLink')
const ToPalette = require('./to/PropertiesToPalette')
const ToReplace = require('./to/PropertiesToReplace')
const ToSub = require('./to/PropertiesToSub')
const ToVariable = require('./to/PropertiesToVariable')

const ToSimilar = require('./to/PropertiesToSimilar')
const ToMulti = require('./to/PropertiesToMulti')
const ToStyle = require('./to/PropertiesToStyle')

const ToAnimate = require('./to/PropertiesToAnimate')
const ToClass = require('./to/PropertiesToClass')
const ToComponent = require('./to/PropertiesToComponent')
const ToFull = require('./to/PropertiesToFull')
const ToMedia = require('./to/PropertiesToMedia')
const ToProperty = require('./to/PropertiesToProperty')
const ToRoot = require('./to/PropertiesToRoot')
const ToState = require('./to/PropertiesToState')
const ToSubclass = require('./to/PropertiesToSubclass')
const ToVar = require('./to/PropertiesToVar')

const ToNone = require('./to/PropertiesToNone')
const ToDivision = require('./to/PropertiesToDivision')

const PropertiesItems = require('../PropertiesItems')
const PropertiesRead = require('../PropertiesRead')
const PropertiesTool = require('../PropertiesTool')

const PropertiesToFull = require('../PropertiesToFull')
const PropertiesToLink = require('../PropertiesToLink')
const PropertiesToMulti = require('../PropertiesToMulti')
const PropertiesPalette = require('../PropertiesPalette')
const PropertiesToRename = require('../PropertiesToRename')
const PropertiesToReplace = require('../PropertiesToReplace')
const PropertiesToStyle = require('../PropertiesToStyle')
const PropertiesToSub = require('../PropertiesToSub')
const PropertiesToVar = require('../PropertiesToVar')
const PropertiesToVariable = require('../PropertiesToVariable')
const { replaceRecursive } = require('../../../functions/data')
const { To } = require('../../To')

const FILE_CACHE = 'properties'

/**
 * The main class for working with tokens
 *
 * Главный класс для работы с токенами
 */
module.exports = class Properties {
  __basic

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
   * Collects into an array from all files and returns the content without processing them
   *
   * Собирает в массив со всех файлов и возвращает содержимое не обрабатывая их
   * @return {Items}
   */
  getBasic () {
    if (!this.__basic) {
      this.__basic = new Items(
        Cache.get([], this.getPathName(), () => {
          const properties = this.__readBasic()

          new ToDivision(properties).to()

          console.info('[Properties]', 'init')

          return properties.get()
        })
      )
    }

    return this.__basic
  }

  /**
   * Getting structured data for use in an SCSS file
   *
   * Получение структурированных данных для работы в SCSS файле
   * @return {string}
   */
  getScss () {
    return Cache.get([], this.getPathName(), () => {
      const properties = new Scss(this.getBasic()).get()

      console.info('[Scss]', 'init')

      return properties
    }, 'scss')
  }

  /**
   * Возвращает название файла для кэша. Это полный массив со всеми обработанными свойствами
   * @return {string}
   */
  getPathName () {
    return `${this.designs.join('-')}-${FILE_CACHE}`
  }

  /**
   * Processing of basic data
   *
   * Обработка базовых данных
   * @return {PropertiesItems}
   * @private
   */
  __readBasic () {
    const path = new Path(this.designs)
    const properties = new Items(To.copy(
      replaceRecursive(
        new ReadSettings(path).get(),
        new ReadMain(path).get()
      )
    ))

    new ToReplace(properties).to()
    new ToPalette(properties).to()
    new ToLink(properties).to()
    new ToSub(properties).to()
    new ToVariable(properties).to()

    new ToSimilar(properties).to()
    new ToMulti(properties).to()
    new ToStyle(properties).to()

    new ToFull(properties).to()
    new ToVar(properties).to()
    new ToProperty(properties).to()
    new ToComponent(properties).to()
    new ToClass(properties).to()
    new ToState(properties).to()
    new ToSubclass(properties).to()
    new ToRoot(properties).to()
    new ToMedia(properties).to()
    new ToAnimate(properties).to()

    new ToNone(properties).to()

    return properties
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

    rename.toByComponent() // ok
    rename.toBySimilar() // ok

    return items.get()
  }
}