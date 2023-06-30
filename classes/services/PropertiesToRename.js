const { forEach } = require('../../functions/data')

// const PropertiesItems = require('./PropertiesItems')
const PropertiesTool = require('./PropertiesTool')

const FILE_CACHE_RENAME = 'properties-rename'
const FILE_CACHE_RENAME_VAR = 'properties-rename-var'
const FILE_CACHE_RENAME_COMPONENT = 'properties-rename-component'
const FILE_CACHE_RENAME_SIMILAR = 'properties-rename-similar'

const SUPPORT_RENAME = [
  'property'
]

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
    this.media = this.items.getItemForMedia()
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
      parents,
      design
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
          item[key] = this.__toNameForMedia(item, name, design)
          break
        case 'animate':
          item[key] = this.__toNameForAnimate(parents, item, name)
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
   * @param {Object<string,*>} item object for checking / объект для проверки
   * @param {string} name name of the name / название имени
   * @return {string}
   * @private
   */
  __getName (item, name) {
    return PropertiesTool.getNameByItem(item, name)
  }

  /**
   * Returns ancestor names
   *
   * Возвращает имена предков
   * @param {{name:string,item:Object<string,*>}[]} parents array of all ancestor properties
   * along the tree from the top level / массив со всеми свойствами предков по дереву от верхнего уровня
   * @param {string[]} variable list of types to exclude, such types are ignored / список типов
   * для исключения, такие типы игнорируются
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
        if (SUPPORT_RENAME.indexOf(parent.item?.[key]) !== -1) {
          return this.__getName(parent.item, parent.name)
        } else {
          return parent.name
        }
      } else {
        return undefined
      }
    }, true)
  }

  /**
   * Name transformation for the var type
   *
   * Преобразование имени для типа var
   * @param {{name:string,item:Object<string,*>}[]} parents array of all ancestor properties
   * along the tree from the top level / массив со всеми свойствами предков по дереву от верхнего уровня
   * @param {Object<string,*>} item current element / текущий элемент
   * @param {string} name base property name / базовое название свойства
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
   * @param {{name:string,item:Object<string,*>}[]} parents array of all ancestor properties
   * along the tree from the top level / массив со всеми свойствами предков по дереву от верхнего уровня
   * @param {Object<string,*>} item current element / текущий элемент
   * @param {string} name base property name / базовое название свойства
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
   * @param {Object<string,*>} item current element / текущий элемент
   * @param {string} name base property name / базовое название свойства
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
   * @param {Object<string,*>} item current element / текущий элемент
   * @param {string} name base property name / базовое название свойства
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
   * @param {Object<string,*>} item current element / текущий элемент
   * @param {string} name base property name / базовое название свойства
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
   * @param {Object<string,*>} item current element / текущий элемент
   * @param {string} name base property name / базовое название свойства
   * @param {string} design design name / название дизайна
   * @return {string}
   * @private
   */
  __toNameForMedia (item, name, design) {
    const values = this.__toValueForMedia(
      this.__getName(item, name).split(','),
      design
    )

    if (values.length > 1) {
      return `(min-width: ${values?.[0] || '0px'}) and (max-width: calc(${values?.[1] || '1980px'} - 1px))`
    } else if (item?.[PropertiesTool.getKeyVariable()] === 'media-max') {
      return `(max-width: calc(${values?.[0] || '1980px'} - 1px))`
    } else {
      return `(min-width: ${values?.[0] || '0px'})`
    }
  }

  /**
   * Updates data if the alias is entered
   *
   * Изменяет данные, если введен алиас
   * @param {string[]} values a list of values for media / список значений для медиа
   * @param {string} design design name / название дизайна
   * @return {string[]}
   * @private
   */
  __toValueForMedia (values, design) {
    return forEach(values, value => {
      const key = value.replace(/^media-/, '')
      return this.media?.[design]?.[key]?.value || key
    })
  }

  /**
   * Name transformation for the animate type
   *
   * Преобразование имени для типа animate
   * @param {{name:string,item:Object<string,*>}[]} parents array of all ancestor properties
   * along the tree from the top level / массив со всеми свойствами предков по дереву от верхнего уровня
   * @param {Object<string,*>} item current element / текущий элемент
   * @param {string} name base property name / базовое название свойства
   * @return {string}
   * @private
   */
  __toNameForAnimate (parents, item, name) {
    if (item?.[PropertiesTool.getKeyFull()]) {
      return name
    } else {
      return `${this.__getParentsName(parents).join('-')}-${name}`
    }
  }
}
