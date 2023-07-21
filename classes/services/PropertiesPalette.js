const {
  forEach,
  replaceRecursive,
  getColumn
} = require('../../functions/data')

const PropertiesTool = require('./PropertiesTool')

const KEY_PALETTE = 'palette'
const KEY_CATEGORY = 'color'

const FILE_CACHE_PALETTE = 'palette'

/**
 * Class for working with colors
 *
 * Класс для работы с цветами
 */
module.exports = class PropertiesPalette {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
    this.palette = this.items.findCategory('palette')
  }

  /**
   * Getting a list of all colors
   *
   * Получение списка всех цветов
   * @return {string[]}
   */
  getListValue () {
    return forEach(
      this.items.findCategory('color'),
      property => property?.item?.value
    )
  }

  /**
   * Returns a list of available saturation levels
   *
   * Возвращает список доступных уровней насыщенности
   * @return {{design: string, value: string[]}[]}
   */
  getListShade () {
    return forEach(
      forEach(
        this.items.findCategory('shade'),
        property => {
          return {
            design: property.design,
            value: property?.item?.value
          }
        }
      ),
      item => {
        return {
          design: item.design,
          value: getColumn(item.value, 'value')
        }
      }
    )
  }

  /**
   * Getting a list of used values
   *
   * Получаем список использованных значений
   * @return {{name:string,value:string}[]}
   */
  getListUsed () {
    const keyName = PropertiesTool.getKeyName()
    const keyCategory = PropertiesTool.getKeyCategory()
    const keyVariable = PropertiesTool.getKeyVariable()
    const list = this.getListValue()
    const data = []

    this.items.each(({
      item,
      design
    }) => {
      if (
        typeof item?.value === 'string' &&
        item?.[keyCategory] !== KEY_CATEGORY &&
        item?.[keyVariable] === 'var' &&
        list.indexOf(item?.value) !== -1
      ) {
        data.push({
          name: item?.[keyName],
          value: `--${design}-palette-${item?.value?.match(/\.([^.{}]+)}/)?.[1]}`
        })
      }
    })

    return data
  }

  /**
   * Adding a class for working with colors
   *
   * Добавление класса для работы со цветами
   * @return {this}
   */
  to () {
    const keyName = PropertiesTool.getKeyName()
    const keyCategory = PropertiesTool.getKeyCategory()
    const keyVariable = PropertiesTool.getKeyVariable()
    const palettes = {}

    this.palette.forEach(palette => {
      const list = this.__getByDesign(palettes, palette)

      forEach(palette.item?.value, (items, name) => {
        const classItem = this.__getByClass(list, name)

        forEach(items?.value, (item, code) => {
          classItem[code] = {
            value: `{${palette.index}.${name}.${code}}`,
            [keyCategory]: KEY_CATEGORY,
            [keyVariable]: 'var',
            [keyName]: code
          }
        })

        this.__addDefault(palette, classItem)
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

  /**
   * Adding a default value
   *
   * Добавление значения по умолчанию
   * @param palette list of classes / список классов
   * @param classItem list of available values for the class / список доступных значений у класса
   * @private
   */
  __addDefault (palette, classItem) {
    const keyVariable = PropertiesTool.getKeyVariable()

    if (PropertiesTool.getKeyDefault() in palette?.item) {
      forEach(this.__getDefaultList(palette.item), (item, index) => {
        if (item in classItem) {
          if (index === 'basic') {
            classItem['sys-palette'] = this.__getDefaultData(classItem, item)
          } else {
            console.log('classItem', classItem)
            classItem[`${index}`] = {
              value: {
                'sys-palette': this.__getDefaultData(classItem, item)
              },
              [keyVariable]: 'root'
            }
          }
        }
      })
    }
  }

  /**
   * Checking the default value
   *
   * Проверка значения по умолчанию
   * @param {Object<string,string>|string} item the value to be checked / проверяемое значение
   * @return {Object<string,string>}
   * @private
   */
  __getDefaultList (item) {
    const keyDefault = PropertiesTool.getKeyDefault()
    return typeof item[keyDefault] === 'object' ? item[keyDefault] : { basic: item[keyDefault] }
  }

  /**
   * Returns a new record for the default value
   *
   * Возвращает новую запись для значения по умолчанию
   * @param classItem list of available values for the class / список доступных значений у класса
   * @param {string} item the name of the property / название свойства
   * @return {Object<string,*>}
   * @private
   */
  __getDefaultData (classItem, item) {
    return {
      ...classItem?.[item],
      [PropertiesTool.getKeyName()]: 'sys-palette',
      [PropertiesTool.getKeyFull()]: true
    }
  }
}
