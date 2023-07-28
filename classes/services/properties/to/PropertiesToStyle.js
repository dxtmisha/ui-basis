const Keys = require('../PropertiesKeys')
const Type = require('../PropertiesType')

const KEY_CUSTOM = 'custom'
const FILE_CACHE = '016-style'

/**
 * A class for working with properties that support additional values
 *
 * Класс для работы со свойствами с поддержкой дополнительных значений
 */
module.exports = class PropertiesToStyle {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  /**
   * Handling a style record
   *
   * Обработка записи стиля
   */
  to () {
    this.items.each(({
      item,
      name,
      design,
      component
    }) => {
      if (
        item?.[Keys.style] &&
        typeof item?.value === 'object' &&
        !item.value?.[KEY_CUSTOM]
      ) {
        item[Keys.variable] = Type.state
        item.value[KEY_CUSTOM] = {
          value: {
            [name]: {
              value: `{${design}.${component}.sys.${name}`,
              [Keys.variable]: Type.property
            }
          },
          [Keys.variable]: Type.state
        }
      }
    })

    this.items.createStep(FILE_CACHE)
  }
}
