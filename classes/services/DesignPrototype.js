const { forEach } = require('../../functions/data')

const DesignCommand = require('./DesignCommand')
const { To } = require('../To')

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
   * @type {PropertiesComponent}
   */
  component

  /**
   * Constructor
   * @param {string} name component name / названия компонента
   * @param {{}} options additional parameters / дополнительные параметры
   */
  constructor (
    name,
    options = {}
  ) {
    super(name, options)
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
   * @param {boolean} remove data deletion / удаление данных
   * @return {string}
   * @protected
   */
  _replacementOnce (sample, name, remove = false) {
    const exp1 = new RegExp(`\\/\\/ :${name}\\.once ([^\r\n]+)([\r\n ]*)`, 'g')
    const exp2 = new RegExp(`\\/\\* :${name}\\.once \\*\\/([\\S\\s]*?)\\/\\* :${name}\\.once\\.end \\*\\/([\r\n ]*)`, 'g')
    const exp3 = new RegExp(`\\/\\* :${name}\\.once (.*?) \\*\\/([\r\n ]*)`, 'g')

    const replacement = (all, data, end) => {
      return remove
        ? ''
        : `${this._replacePath(data.trim().replaceAll(this.replaceName, this.component.getComponent()))}${end}`
    }

    return sample
      .replace(exp1, replacement)
      .replace(exp2, replacement)
      .replace(exp3, replacement)
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
    return sample.replaceAll(this.replaceName, this.component.getComponent())
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
    return sample.replace(new RegExp(`(${this.replaceName})([A-Z])`, 'g'), `${this.component.getComponent()}$2`)
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
    const classes = this.component.getClasses()
    const templates = []

    forEach(classes, (className, index) => {
      templates.push(`\r\n  ${To.camelCase(index)}: '${className}'`)
    })

    return this._replacement(sample, 'subclass', templates.join(','))
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
    const props = this.component.getProps()
    const templates = []

    forEach(props, (item, index) => {
      if (!sample.match(`:type.${index}.none`)) {
        const indexName = To.camelCase(index)
        let type = this.component.getPropsType(item.valueAll)
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
   * Adding types for properties
   *
   * Добавление типов для свойств
   * @param {string} sample property template / шаблон свойства
   * @return {string}
   * @protected
   */
  _replacePropsType (sample) {
    const props = this.component.getProps()
    const templates = []

    forEach(props, (item, index) => {
      if (sample.match(`:type.${index}`)) {
        sample = sample.replace(
          new RegExp(`(/[*] ?:type[.]${index} ?[*]/)[^\r\n]*`, 'g'),
          `$1 | ${this.component.getTypeByName(item.valueAll, item?.style)}`
        )
      } else if (!sample.match(`:type.${index}.none`)) {
        templates.push(`\r\n  ${To.camelCase(index)}?: ${this.component.getTypeByName(item.valueAll, item?.style)}`)
      }
    })

    return this._replacement(sample, 'type', templates.join(''))
  }

  /**
   * Adding default values for properties
   *
   * Добавление значения по умолчанию для свойств
   * @param {string} sample property template / шаблон свойства
   * @return {string}
   * @protected
   */
  _replacePropsDefault (sample) {
    const props = this.component.getProps()
    const templates = []

    forEach(props, (item, index) => {
      if (
        item.default &&
        !sample.match(`:default.${index}.none`)
      ) {
        templates.push(`\r\n    ${To.camelCase(index)}: ${this.component.getDefault(item.default)}`)
      }
    })

    return this._replacement(sample, 'default', templates.join(','), '    ')
  }
}
