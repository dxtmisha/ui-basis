const {
  forEach,
  replaceRecursive
} = require('../../functions/data')

const PropertiesTool = require('./PropertiesTool')

const KEY_PALETTE = 'palette'
const FILE_CACHE_PALETTE = 'palette'

/**
 * Class for working with colors
 *
 * Класс для работы с цветами
 */
module.exports = class PropertiesToPalette {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
    this.palette = this.items.findCategory('palette')
  }

  /**
   * Adding a class for working with colors
   *
   * Добавление класса для работы со цветами
   * @return {this}
   */
  to () {
    const keyName = PropertiesTool.getKeyName()
    const keyVariable = PropertiesTool.getKeyVariable()
    const palettes = {}

    this.palette.forEach(palette => {
      const list = this.__getByDesign(palettes, palette)

      forEach(palette.item?.value, (items, name) => {
        const classItem = this.__getByClass(list, name)

        forEach(items?.value, (item, code) => {
          classItem[code] = {
            value: `{${palette.index}.${name}.${code}}`,
            [keyVariable]: 'var',
            [keyName]: code
          }
        })
      })
    })

    replaceRecursive(this.items.get(), palettes)
    this.items.cache(FILE_CACHE_PALETTE)

    return this
  }

  /**
   * Adding a group of properties based on the design name
   *
   * Добавление группы свойств по названию дизайна
   * @param {Object<string,*>} palettes list of classes / список классов
   * @param {Object<string,*>} item object with data / объект с данными
   * @return {Object<string,*>}
   * @private
   */
  __getByDesign (palettes, item) {
    if (!(item.design in palettes)) {
      palettes[item.design] = {
        value: {
          [KEY_PALETTE]: {
            value: {},
            [PropertiesTool.getKeyCategory()]: 'class',
            [PropertiesTool.getKeyVariable()]: 'component',
            [PropertiesTool.getKeyName()]: KEY_PALETTE
          }
        }
      }
    }

    return palettes[item.design].value.palette.value
  }

  /**
   * Adding a new class with the name of the color
   *
   * Добавление нового класса по имени цвета
   * @param {Object<string,*>} palettes list of classes / список классов
   * @param className class name / название класса
   * @return {Object<string,*>}
   * @private
   */
  __getByClass (palettes, className) {
    if (!(className in palettes)) {
      palettes[className] = {
        value: {},
        [PropertiesTool.getKeyVariable()]: 'state',
        [PropertiesTool.getKeyName()]: className
      }
    }

    return palettes[className].value
  }
}
