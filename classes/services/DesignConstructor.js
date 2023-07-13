const { forEach } = require('../../functions/data')
const { To } = require('../To')

const DesignCommand = require('./DesignCommand')
const PropertiesComponent = require('./PropertiesComponent')

const DIR_NAME = 'constructors'

const FILE_CLASS = 'ConstructorDesign.ts'
const FILE_TYPES = 'types.ts'
const FILE_PROPS = 'props.ts'
const FILE_STYLE = 'style.scss'
const FILE_PROPERTIES = 'properties.json'

/**
 * Class for generating files for components
 *
 * Класс для генерации файлов для компонентов
 */
module.exports = class DesignConstructor extends DesignCommand {
  dirSampleName = 'constructor'
  properties = {}

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

    this.component = new PropertiesComponent(`d.${name}`, false, [])
    this.dir = this._initDir()
  }

  initMain () {
    this
      .__initClass()
      .__initTypes()
      .__initProps()
      .__initStyle()
      .__initProperties()
  }

  /**
   * Returns an array of paths to components
   *
   * Возвращает массив с путями к компонентам
   * @return {string[]}
   * @protected
   */
  _initDir () {
    return [
      ...super._initDir(),
      DIR_NAME,
      To.camelCaseFirst(this.name)
    ]
  }

  /**
   * Reads the file types.ts
   *
   * Читает файл types.ts
   * @return {string}
   * @private
   */
  __readTypes () {
    return this._read(FILE_TYPES)
  }

  /**
   * Reads the file props.ts
   *
   * Читает файл props.ts
   * @return {string}
   * @private
   */
  __readProps () {
    return this._read(FILE_PROPS)
  }

  /**
   * This code reads a template for the ConstructorDesign.ts
   *
   * Читает шаблона для файла ConstructorDesign.ts
   * @return {string}
   * @private
   */
  __readSampleClass () {
    return this._readSample(FILE_CLASS)
  }

  /**
   * This code reads a template for the types.ts
   *
   * Читает шаблона для файла types.ts
   * @return {string}
   * @private
   */
  __readSampleTypes () {
    return this._readSample(FILE_TYPES)
  }

  /**
   * This code reads a template for the props.ts
   *
   * Читает шаблона для файла props.ts
   * @return {string}
   * @private
   */
  __readSampleProps () {
    return this._readSample(FILE_PROPS)
  }

  /**
   * This code reads a template for the properties.json
   *
   * Читает шаблона для файла properties.json
   * @return {string}
   * @private
   */
  __readSampleStyle () {
    return this._readSample(FILE_STYLE)
  }

  /**
   * This code reads a template for the properties.json
   *
   * Читает шаблона для файла properties.json
   * @return {string}
   * @private
   */
  __readSampleProperties () {
    return this._readSample(FILE_PROPERTIES)
  }

  /**
   * This code generates the ConstructorDesign.ts
   *
   * Генерация файла ConstructorDesign.ts
   * @return {this}
   * @private
   */
  __initClass () {
    const file = FILE_CLASS.replace('Constructor', To.camelCaseFirst(this.name))

    if (!this._isFile(file)) {
      const sample = this.__readSampleClass()
        .replaceAll('../../../', this.getRoot())
        .replace(/(Constructor)([A-Z])/g, To.camelCaseFirst(`${this.name}$2`))

      this._console(file)
      this._createFile(file, sample)
    }

    return this
  }

  /**
   * This code generates the types.ts
   *
   * Генерация файла types.ts
   * @return {this}
   * @private
   */
  __initTypes () {
    const file = FILE_TYPES
    let sample

    if (this._isFile(file)) {
      const classes = this.component.getClasses()
      const templates = []

      forEach(classes, (className, index) => {
        templates.push(`\r\n  ${index}: '${className}'`)
      })

      sample = this.__readTypes()
        .replace(/(\/\/ :subclass)([\S\s]+)(\/\/ :subclass)/, `$1${templates.join(',')}\r\n  $3`)
    } else {
      sample = this.__readSampleTypes()
        .replaceAll('../../../', this.getRoot())
        .replaceAll('Constructor', To.camelCaseFirst(this.name))
    }

    if (sample) {
      this._console(file)
      this._createFile(file, sample)
    }

    return this
  }

  /**
   * This code generates the props.ts
   *
   * Генерация файла props.ts
   * @return {this}
   * @private
   */
  __initProps () {
    const file = FILE_PROPS
    let sample

    if (this._isFile(file)) {
      sample = this.__readProps()
      sample = this.__initPropsType(sample)
      sample = this.__initPropsDefault(sample)
      sample = this.__initPropsProp(sample)
    } else {
      sample = this.__readSampleProps()
        .replaceAll('Constructor', To.camelCaseFirst(this.name))
    }

    if (sample) {
      this._console(file)
      this._createFile(file, sample)
    }

    return this
  }

  /**
   * Adding types for properties
   *
   * Добавление типов для свойств
   * @param {string} sample property template / шаблон свойства
   * @return {string}
   * @private
   */
  __initPropsType (sample) {
    const props = this.component.getProps()
    const templates = []

    forEach(props, (item, index) => {
      if (sample.match(`:type.${index}`)) {
        sample = sample.replace(
          new RegExp(`(/[*] ?:type[.]${index} ?[*]/)[^\r\n]*`, 'g'),
          `$1 | ${this.component.getTypeByName(item.valueAll, item?.style)}`
        )
      } else if (!sample.match(`:type.${index}.none`)) {
        templates.push(`\r\n  ${index}?: ${this.component.getTypeByName(item.valueAll, item?.style)}`)
      }
    })

    return sample.replace(/(\/\/ :type)([\S\s]+)(\/\/ :type)/, `$1${templates.join('')}\r\n  $3`)
  }

  /**
   * Adding default values for properties
   *
   * Добавление значения по умолчанию для свойств
   * @param {string} sample property template / шаблон свойства
   * @return {string}
   * @private
   */
  __initPropsDefault (sample) {
    const props = this.component.getProps()
    const templates = []

    forEach(props, (item, index) => {
      if (
        item.default &&
        !sample.match(`:default.${index}.none`)
      ) {
        templates.push(`\r\n  ${index}: ${this.component.getDefault(item.default)},`)
      }
    })

    return sample.replace(/(\/\/ :default)([\S\s]+)(\/\/ :default)/, `$1${templates.join('')}\r\n  $3`)
  }

  /**
   * Adding types for properties
   *
   * Добавление самих свойств
   * @param {string} sample property template / шаблон свойства
   * @return {string}
   * @private
   */
  __initPropsProp (sample) {
    const props = this.component.getProps()
    const name = To.camelCaseFirst(this.name)
    const templates = []

    forEach(props, (item, index) => {
      if (!sample.match(`:type.${index}.none`)) {
        templates.push(
          `\r\n  ${index}: {` +
          `\r\n    type: [${this.component.getPropsType(item.valueAll).join(', ')}] as PropType<Props${name}Type['${index}']>` +
          (item.default ? `,\r\n    default: defaults${name}?.${index}` : '') +
          '\r\n  },'
        )
      }
    })

    return sample
      .replace(/(\/\/ ?)(import \{[^{]+PropType[^}]+})/, '$2')
      .replace(/(\/\/ :prop)([\S\s]+)(\/\/ :prop)/, `$1${templates.join('')}\r\n  $3`)
  }

  /**
   * This code generates the style.scss
   *
   * Генерация файла style.scss
   * @return {this}
   * @private
   */
  __initStyle () {
    const file = FILE_STYLE

    if (!this._isFile(file)) {
      const sample = this.__readSampleStyle()
        .replaceAll('../../../', this.getRoot())
        .replaceAll('Constructor', To.camelCaseFirst(this.name))

      this._console(file)
      this._createFile(file, sample)
    }

    return this
  }

  /**
   * This code generates the properties.json
   *
   * Генерация файла properties.json
   * @return {this}
   * @private
   */
  __initProperties () {
    const file = FILE_PROPERTIES

    if (!this._isFile(file)) {
      const sample = this.__readSampleProperties()

      this._console(file)
      this._createFile(file, sample)
    }

    return this
  }
}
