const { forEach } = require('../../functions/data')
const { To } = require('../To')

const Loader = require('./properties/PropertiesLoader')
const DesignCommand = require('./DesignCommand')

/**
 * Class with basic replacement for templates
 *
 * Класс с базовой заменой для шаблонов
 */
module.exports = class DesignPrototype extends DesignCommand {
  /**
   * Name for replacement
   *
   * Название для замены
   * @type {string}
   */
  replaceName = 'Constructor'

  /**
   * Object for working with components
   *
   * Объект для работы с компонентами
   * @type {PropertiesLoader}
   */
  loader

  /**
   * Constructor
   * @param {string} name component name / названия компонента
   * @param {{}} options additional parameters / дополнительные параметры
   */
  constructor (
    name,
    options = {}
  ) {
    const [design, component] = name.split('.', 2)

    super(name, options)

    this.loader = new Loader(design, component)
  }

  /**
   * Replaces values with selected label
   *
   * Заменяет значения на выбранную метку
   * @param {string} sample template with data / шаблон с данными
   * @param {string} name label name / название метки
   * @param {string} data data for replacement / данные для замены
   * @param {string} space adding a space / добавление пробела
   * @return {string}
   * @protected
   */
  _replacement (
    sample,
    name,
    data,
    space = '  '
  ) {
    return sample
      .replace(
        new RegExp(`(\\/\\/ :${name})([\\S\\s]+)(\\/\\/ :${name})`, 'g'),
        `$1${data}\r\n${space}$3`
      )
  }

  /**
   * Replaces values with the selected label only once
   *
   * Заменяет значения на выбранную метку только 1 раз
   * @param {string} sample template with data / шаблон с данными
   * @param {string} name label name / название метки
   * @param {boolean|Function} removeReplacement data deletion / удаление данных
   * @return {string}
   * @protected
   */
  _replacementOnce (sample, name, removeReplacement = false) {
    const exp1 = new RegExp(`\\/\\/ :${name}\\.once ([^\r\n]+)([\r\n ]*)`, 'g')
    const exp2 = new RegExp(`\\/\\* :${name}\\.once \\*\\/([\\S\\s]*?)\\/\\* :${name}\\.once\\.end \\*\\/([\r\n ]*)`, 'g')
    const exp3 = new RegExp(`\\/\\* :${name}\\.once (.*?) \\*\\/([\r\n ]*)`, 'g')
    const exp4 = new RegExp(`<!-- :${name}\\.once -->([\\S\\s]*?)<!-- :${name}\\.once\\.end -->([\r\n ]*)`, 'g')
    const exp5 = new RegExp(`<!-- :${name}\\.once (.*?) -->([\r\n ]*)`, 'g')

    const replacement = (all, data, end) => {
      if (typeof removeReplacement === 'function') {
        return `${removeReplacement(data.trim())}${end}`
      } else {
        return removeReplacement === true
          ? ''
          : `${this._replacePath(data.trim().replaceAll(this.replaceName, this.loader.getComponent()))}${end}`
      }
    }

    return sample
      .replace(exp1, replacement)
      .replace(exp2, replacement)
      .replace(exp3, replacement)
      .replace(exp4, replacement)
      .replace(exp5, replacement)
  }

  /**
   * Изменения путь к файлу
   * @param {string} sample property template / шаблон свойства
   * @return {string}
   * @protected
   */
  _replacePath (sample) {
    return sample.replaceAll('../../../', this.getRoot())
  }

  /**
   * Changing the name of the component
   *
   * Изменение названия компонента
   * @param {string} sample property template / шаблон свойства
   * @return {string}
   * @protected
   */
  _replaceName (sample) {
    return sample.replaceAll(this.replaceName, this.loader.getComponent())
  }

  /**
   * Changing the name of the component for properties
   *
   * Изменение названия компонента для свойств
   * @param {string} sample property template / шаблон свойства
   * @return {string}
   * @protected
   */
  _replaceNameForProperties (sample) {
    return sample.replace(new RegExp(`(${this.replaceName})([A-Z])`, 'g'), `${this.loader.getComponent()}$2`)
  }

  /**
   * Changes data for subclasses
   *
   * Изменяет данные для подклассов
   * @param {string} sample property template / шаблон свойства
   * @return {string}
   * @protected
   */
  _replaceSubclass (sample) {
    const classes = this.loader.getClasses()
    const templates = []

    forEach(classes, (className, index) => {
      templates.push(`\r\n    ${To.camelCase(index)}: '${className}'`)
    })

    return this._replacement(sample, 'subclass', templates.join(','), '    ')
  }

  /**
   * Adding types for properties
   *
   * Добавление самих свойств
   * @param {string} sample property template / шаблон свойства
   * @param {string} name property name / название свойства
   * @return {string}
   * @protected
   */
  _replaceProps (sample, name) {
    const props = this.loader.get()
    const templates = []

    forEach(props, (item, index) => {
      if (!sample.match(`:type.${index}.none`)) {
        const indexName = To.camelCase(index)
        let type = this.__getPropsType(item.valueAll)
        type = type.length > 1 ? `[${type.join(', ')}]` : type?.[0]

        if (type !== 'Boolean') {
          type = `${type} as PropType<Props${name}Type['${indexName}']>`
        }

        if (item.default) {
          templates.push(
            `\r\n    ${indexName}: {` +
            `\r\n      type: ${type},` +
            `\r\n      default: defaults${name}?.${indexName}` +
            '\r\n    }'
          )
        } else {
          templates.push(`\r\n    ${indexName}: ${type}`)
        }
      }
    })

    return this._replacement(
      sample
        .replace(/(\/\/ ?)(import \{[^{]+PropType[^}]+})/, '$2'),
      'prop',
      templates.join(','),
      '    '
    )
  }

  /**
   * Returns available types for property
   *
   * Возвращает доступные типы для свойства
   * @param {(string|boolean)[]} value values to check / значения для проверки
   * @return {string[]}
   * @private
   */
  __getPropsType (value) {
    const type = []

    if (this.__isBoolean(value)) {
      type.push('Boolean')
    }

    if (this.__isString(value)) {
      type.push('String')
    }

    if (type.length === 0) {
      type.push('Boolean')
    }

    return type
  }

  /**
   * Adding types for properties
   *
   * Добавление типов для свойств
   * @param {string} sample property template / шаблон свойства
   * @return {string}
   * @protected
   */
  _replacePropsType (sample) {
    const props = this.loader.get()
    const templates = []

    forEach(props, ({
      valueAll,
      style
    }, index) => {
      const types = this.__getTypeByName(valueAll, style)

      if (sample.match(`:type.${index}`)) {
        sample = sample.replace(
          new RegExp(`(/[*] ?:type[.]${index} ?[*]/)[^\r\n]*`, 'g'),
          `$1 | ${types}`
        )
      } else if (!sample.match(`:type.${index}.none`)) {
        templates.push(`\r\n  ${To.camelCase(index)}?: ${types}`)
      }
    })

    return this._replacement(sample, 'type', templates.join(''))
  }

  /**
   * Returns a string with the data type
   *
   * Возвращает строку с типом данных
   * @param {(string|boolean)[]} value values to check / значения для проверки
   * @param {boolean} style is the property style present / является ли свойство style
   * @return {string}
   * @private
   */
  __getTypeByName (value, style) {
    const types = []

    if (this.__isBoolean(value)) {
      types.push('boolean')
    }

    if (style) {
      types.push('string')
    }

    if (this.__isString(value)) {
      value.forEach(item => types.push(item === true ? 'true' : `'${item}'`))
    }

    if (types.length === 0) {
      types.push('boolean')
    }

    return types.join(' | ')
  }

  /**
   * Adding default values for properties
   *
   * Добавление значения по умолчанию для свойств
   * @param {string} sample property template / шаблон свойства
   * @param {string} space adding a space / добавление пробела
   * @return {string}
   * @protected
   */
  _replacePropsDefault (sample, space = '    ') {
    const props = this.loader.get()
    const templates = []

    forEach(props, (item, index) => {
      if (
        item.default &&
        !sample.match(`:default.${index}.none`)
      ) {
        templates.push(`\r\n${space}${To.camelCase(index)}: ${this.__getDefault(item.default)}`)
      }
    })

    return this._replacement(sample, 'default', templates.join(','), space)
  }

  /**
   * Returns default values
   *
   * Возвращает значения по умолчанию
   * @param {string|boolean} value
   * @return {string}
   * @private
   */
  __getDefault (value) {
    if (typeof value === 'string') {
      return `'${value}'`
    } else {
      return `${value}`
    }
  }

  /**
   * Checks if the data type is boolean
   *
   * Проверяет, является ли тип данных булевым
   * @param {(string|boolean)[]} value values to check / значения для проверки
   * @return {boolean}
   */
  __isBoolean (value) {
    return value.indexOf(true) !== -1
  }

  /**
   * Checks if the data type is string
   *
   * Проверяет, является ли тип данных строковым
   * @param {(string|boolean)[]} value values to check / значения для проверки
   * @return {boolean}
   */
  __isString (value) {
    return value.length > 0 && value[0] !== true
  }
}
