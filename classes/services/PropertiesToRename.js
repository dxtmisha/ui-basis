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
      switch (item?.[keyVariable]) {
        case 'component':
          if (typeof item?.value === 'object') {
            item[key] = this.__toNameForComponent(parents, item, name)
          }
          break
        case 'state':
          item[key] = this.__toNameForState(item, name)
          break
        case 'subclass':
          item[key] = this.__toNameForSubclass(item, name)
          break
        case 'media':
        case 'media-max':
          item[key] = this.__toNameForMedia(item, name)
          break
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
   * @param {string[]} variable
   * @return {string[]}
   * @private
   */
  __getParentsName (parents, variable = undefined) {
    const key = PropertiesTool.getKeyVariable()

    return forEach(parents, parent => {
      if (
        !variable ||
        ['design', 'component'].indexOf(parent.item?.[key]) !== -1 ||
        variable.indexOf(parent.item?.[key]) !== -1
      ) {
        return parent.name
      } else {
        return undefined
      }
    }, true)
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
      return `--${this.__getParentsName(parents, ['var']).join('-')}-${name}`
    }
  }

  /**
   * Name transformation for the component type
   *
   * Преобразование имени для типа component
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

  /**
   * Name transformation for the state type
   *
   * Преобразование имени для типа state
   * @param {Object<string,*>} item
   * @param {string} name
   * @return {string}
   * @private
   */
  __toNameForState (item, name) {
    if (item?.[PropertiesTool.getKeyFull()]) {
      return `&.${name}`
    } else {
      return `&--${name}`
    }
  }

  /**
   * Name transformation for the virtual type
   *
   * Преобразование имени для типа virtual
   * @param {Object<string,*>} item
   * @param {string} name
   * @return {string}
   * @private
   */
  __toNameForVirtual (item, name) {
    return `&::${this.__getName(item, name)}`
  }

  /**
   * Name transformation for the subclass type
   *
   * Преобразование имени для типа subclass
   * @param {Object<string,*>} item
   * @param {string} name
   * @return {string}
   * @private
   */
  __toNameForSubclass (item, name) {
    if (item?.[PropertiesTool.getKeyFull()]) {
      return `& .${name}`
    } else {
      return `&__${name}`
    }
  }

  /**
   * Name transformation for the media, media-max type
   *
   * Преобразование имени для типа media, media-max
   * @param {Object<string,*>} item
   * @param {string} name
   * @return {string}
   * @private
   */
  __toNameForMedia (item, name) {
    const values = this.__getName(item, name).split(',')

    if (values.length > 1) {
      return `(min-width: ${values?.[0] || '0px'}) and (max-width: calc(${values?.[1] || '1980px'} - 1px))`
    } else if (item?.[PropertiesTool.getKeyVariable()] === 'media-max') {
      return `(max-width: calc(${values?.[0] || '1980px'} - 1px))`
    } else {
      return `(min-width: ${values?.[0] || '0px'})`
    }
  }
}
