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
   * @param {PropertiesItems} items object of class PropertiesItems / объект класса PropertiesItems
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
    const keyDefault = PropertiesTool.getKeyDefault()

    this.items.each(({
      item,
      design,
      component
    }) => {
      const value = PropertiesTool.toFullByDesigns(item.value, design, designs)

      if (item[keyDefault]) {
        item[keyDefault] = PropertiesTool.toFullByDesigns(item[keyDefault], design, designs)
      }

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
   * Returns a formatted string with the addition of the property name and component
   *
   * Возвращает отформатированную строку с добавлением названия свойства и компонента
   * @param {string} value property names for processing / названия свойств для обработки
   * @param {RegExp} designSymbol regular expression for design / регулярное выражение для дизайна
   * @param {RegExp} componentSymbol regular expression for component / регулярное выражение для компонента
   * @param {string} design design name / название дизайна
   * @param {string} component component name / название компонента
   * @return {*}
   * @private
   */
  __getFullValue (
    value,
    designSymbol,
    componentSymbol,
    design,
    component
  ) {
    if (componentSymbol) {
      value = value
        .replace(componentSymbol, `${design}.${component}.`)
    }

    value = value
      .replace(designSymbol, `${design}.`)

    return value
  }

  /**
   * Converts special characters to the full path
   *
   * Преобразовывает специальные символы в полный путь
   * @param {string} cache cache file name / название файла кеша
   * @param {RegExp} designSymbol regular expression for design / регулярное выражение для дизайна
   * @param {RegExp} componentSymbol regular expression for component / регулярное выражение для компонента
   * @return {this}
   * @private
   */
  __toFullValueFix (
    cache,
    designSymbol,
    componentSymbol
  ) {
    const keyDefault = PropertiesTool.getKeyDefault()

    this.items.each(({
      item,
      design,
      component
    }) => {
      if (item[keyDefault]?.match(designSymbol)) {
        item[keyDefault] = this.__getFullValue(
          item[keyDefault],
          designSymbol,
          componentSymbol,
          design,
          component
        )
      }

      if (item.value?.match(designSymbol)) {
        item.value = this.__getFullValue(
          item.value,
          designSymbol,
          componentSymbol,
          design,
          component
        )

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
