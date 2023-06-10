// const PropertiesItems = require('./PropertiesItems')
const PropertiesTool = require('./PropertiesTool')

const FILE_CACHE_FULL = 'properties-full'
const FILE_CACHE_FULL_FIX = 'properties-full-fix'
const FILE_CACHE_FULL_DESIGN = 'properties-full-design'

/**
 * Class for path substitution
 *
 * Класс для подстановки полного пути
 */
module.exports = class PropertiesToFull {
  /**
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  /**
   * Replacing values ? and ?? with design and component names
   *
   * Изменение значений ? и ?? на названия дизайна и компонента
   * @return {this}
   */
  toFullValue () {
    return this.__toFullValueFix(
      FILE_CACHE_FULL,
      /(?<=\{)\?/g,
      /(?<=\{)\?\?/g
    )
  }

  /**
   * Replacing values # and ## with design and component names
   *
   * Изменение значений # и ## на названия дизайна и компонента
   * @return {this}
   */
  toFullValueFix () {
    return this.__toFullValueFix(
      FILE_CACHE_FULL_FIX,
      /(?<=\{)#/g,
      /(?<=\{)##/g
    )
  }

  /**
   * Adds the design name to all values without the design prefix
   *
   * Добавляет название дизайна ко всем значениям без префикса дизайна
   * @return {this}
   */
  toFullValueByDesign () {
    const designs = this.items.getDesigns()

    this.items.each(({
      item,
      design,
      component
    }) => {
      const value = PropertiesTool.toFullByDesigns(item.value, design, designs)

      if (item.value !== value) {
        item.value = value

        return {
          item,
          design,
          component
        }
      }
    }, { isValue: true })

    this.items.cache(FILE_CACHE_FULL_DESIGN)

    return this
  }

  /**
   * Converts special characters to the full path
   *
   * Преобразовывает специальные символы в полный путь
   * @param {string} cache
   * @param {RegExp} designSymbol
   * @param {RegExp} componentSymbol
   * @return {this}
   * @private
   */
  __toFullValueFix (
    cache,
    designSymbol,
    componentSymbol
  ) {
    this.items.each(({
      item,
      design,
      component
    }) => {
      const isValue = !!item.value?.match(designSymbol)

      if (isValue) {
        if (componentSymbol) {
          item.value = item.value
            .replace(componentSymbol, `${design}.${component}.`)
        }

        item.value = item.value
          .replace(designSymbol, `${design}.`)

        return {
          item,
          design,
          component
        }
      }
    }, { isValue: true })

    this.items.cache(cache)

    return this
  }
}
