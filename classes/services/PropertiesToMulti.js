const { forEach } = require('../../functions/data')

// const PropertiesItems = require('./PropertiesItems')
const PropertiesTool = require('./PropertiesTool')

const FILE_CACHE_MULTI = 'properties-multi'

/**
 * Class for converting properties with multiple values
 *
 * Класс для преобразования свойств с множеством значений
 */
module.exports = class PropertiesToMulti {
  /**
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  /**
   * Converts property records with multiple types
   *
   * Преобразует записи свойств со множеством типов
   * @return {this}
   */
  to () {
    const key = PropertiesTool.getKeyVariable()

    this.__getList().forEach(({
      item,
      index,
      name,
      design,
      component,
      value
    }) => {
      this.__toGo(name, value)

      item[key] = 'state'

      // TODO: в разработке
      /*
      value[`sys-multi-${name}`] = {
        value: PropertiesTool.toFullForName(`var(--??s-${index})`, design, component),
        [PropertiesTool.getKeyName()]: name,
        [key]: 'property'
      }
      */
    })

    this.items.cache(FILE_CACHE_MULTI)

    return this
  }

  /**
   * Returns a list of properties with multiple values
   *
   * Возвращает список свойств с множеством значений
   * @return {{
   *   item: Object<string,*>,
   *   index: string,
   *   name: string,
   *   design: string,
   *   component: string,
   *   value: Object<string,*>
   * }[]}
   * @private
   */
  __getList () {
    const keyName = PropertiesTool.getKeyName()
    const keyVariable = PropertiesTool.getKeyVariable()

    return this.items.each(({
      item,
      name,
      design,
      component
    }) => {
      if (
        item?.[keyVariable] === 'property' &&
        typeof item?.value === 'object'
      ) {
        return {
          item,
          index: name,
          name: item?.[keyName],
          design,
          component,
          value: item.value
        }
      }
    })
  }

  /**
   * Transformation for the element
   *
   * Преобразование для элемента
   * @param {string} name property name / название свойства
   * @param {Object<string,*>} properties an array that needs to be
   * transformed / массив, который нужно преобразовать
   * @private
   */
  __toGo (name, properties) {
    const keyVariable = PropertiesTool.getKeyVariable()

    forEach(properties, item => {
      if (
        typeof item?.value !== 'object' &&
        ['state', 'var'].indexOf(item[keyVariable]) !== -1
      ) {
        item[keyVariable] = 'state'
        item.value = {
          [name]: {
            value: item.value,
            [PropertiesTool.getKeyName()]: name,
            [keyVariable]: 'property'
          }
        }
      }
    })
  }
}
