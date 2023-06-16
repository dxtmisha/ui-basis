const { forEach } = require('../../functions/data')

// const PropertiesItems = require('./PropertiesItems')
const PropertiesTool = require('./PropertiesTool')

const FILE_CACHE_RENAME = 'properties-rename'
const FILE_CACHE_RENAME_VAR = 'properties-rename-var'
const FILE_CACHE_RENAME_COMPONENT = 'properties-rename-component'
const FILE_CACHE_RENAME_SIMILAR = 'properties-rename-similar'

/**
 * Class for working with the property name
 *
 * Класс для работы с именем свойства
 */
module.exports = class PropertiesToRename {
  /**
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  /**
   * Adds the property name to the property
   *
   * Добавляет в свойство название свойства
   * @return {this}
   */
  to () {
    const key = PropertiesTool.getKeyName()

    this.items.each(({
      item,
      name,
      design,
      component
    }) => {
      item[key] = PropertiesTool.toFullForName(
        this.__getName(item, name),
        design,
        component
      )
    })

    this.items.cache(FILE_CACHE_RENAME)

    return this
  }

  /**
   * Adds full property name to var type property
   *
   * Добавляет полное название свойства типу var
   * @return {this}
   */
  toByVar () {
    const key = PropertiesTool.getKeyName()
    const keyVariable = PropertiesTool.getKeyVariable()

    this.items.each(({
      item,
      name,
      design,
      component,
      parents
    }) => {
      if (
        item?.[keyVariable] === 'var' &&
        typeof item?.value !== 'object'
      ) {
        item[key] = PropertiesTool.toFullForName(
          this.__toNameForVar(parents, item, name),
          design,
          component
        )
      }
    })

    this.items.cache(FILE_CACHE_RENAME_VAR)

    return this
  }

  /**
   * Adds full property name to component type property
   *
   * Добавляет полное название свойства типу component
   * @return {this}
   */
  toByComponent () {
    const key = PropertiesTool.getKeyName()
    const keyVariable = PropertiesTool.getKeyVariable()

    this.items.each(({
      item,
      name,
      parents
    }) => {
      if (
        item?.[keyVariable] === 'component' &&
        typeof item?.value === 'object'
      ) {
        item[key] = this.__toNameForComponent(parents, item, name)
      }
    })

    this.items.cache(FILE_CACHE_RENAME_COMPONENT)

    return this
  }

  /**
   * Finding similar data for editing
   *
   * Поиск похожих данных для редактирования
   * @return {this}
   */
  toBySimilar () {
    const key = PropertiesTool.getKeyName()

    this.items.each(({
      item,
      name,
      parents
    }) => {
      const similar = PropertiesTool.getSimilarParent(item, name, parents)

      if (similar) {
        item[key] = this.__getName(similar, name)
      }
    })

    this.items.cache(FILE_CACHE_RENAME_SIMILAR)

    return this
  }

  /**
   * Returns the standard name
   *
   * Возвращает стандартное имя
   * @param {Object<string,*>} item Object for checking / Объект для проверки
   * @param {string} name Name of the name / Название имени
   * @return {string}
   * @private
   */
  __getName (item, name) {
    const keyName = PropertiesTool.getKeyName()
    const keyRename = PropertiesTool.getKeyRename()

    if (item?.[keyName]) {
      return item[keyName]
    } else if (item?.[keyRename]) {
      return PropertiesTool.getName(item?.[keyRename])
    } else {
      return PropertiesTool.getName(name)
    }
  }

  /**
   * Returns ancestor names
   *
   * Возвращает имена предков
   * @param {Object<string,*>} parents
   * @return {string[]}
   * @private
   */
  __getParentsName (parents) {
    return forEach(parents, parent => parent.name)
  }

  /**
   * Name transformation for the var type
   *
   * Преобразование имени для типа var
   * @param {Object<string,*>} parents
   * @param {Object<string,*>} item
   * @param {string} name
   * @return {string}
   * @private
   */
  __toNameForVar (parents, item, name) {
    if (item?.[PropertiesTool.getKeyFull()]) {
      return `--${name}`
    } else {
      return `--${this.__getParentsName(parents).join('-')}-${name}`
    }
  }

  /**
   * Name transformation for the var type
   *
   * Преобразование имени для типа var
   * @param {Object<string,*>} parents
   * @param {Object<string,*>} item
   * @param {string} name
   * @return {string}
   * @private
   */
  __toNameForComponent (parents, item, name) {
    if (item?.[PropertiesTool.getKeyFull()]) {
      return `${name}`
    } else {
      return `${this.__getParentsName(parents).join('-')}-${name}`
    }
  }
}
