const { forEach } = require('../../functions/data')

const PropertiesComponent = require('./PropertiesComponent')
const PropertiesFiles = require('./PropertiesFiles')

const DIR_SAMPLE = [__dirname, '..', '..', 'media', 'templates', 'component']

const FILE_INDEX = 'index.vue'
const FILE_PROPS = 'props.ts'
const FILE_PROPS_DESIGN = 'props.design.ts'
const FILE_PROPERTIES = 'properties.json'

/**
 * Class for creating a component or updating data
 *
 * Класс для создания компонента или обновления данных
 */
module.exports = class DesignComponent {
  /**
   * Constructor
   * @param {string} name component name / названия компонента
   * @param {{create:boolean, update:boolean}} options additional parameters / дополнительные параметры
   */
  constructor (
    name,
    options = {}
  ) {
    this.name = name
    this.options = options // TODO: не использовано еще
    this.component = new PropertiesComponent(name)

    this.dir = this.__initDir()
  }

  init () {
    this.__initIndex()
      .__initPropsDesign()
      .__initProps()
      .__initProperties()
  }

  /**
   * Checks the presence of a file
   *
   * Проверяет наличие файла
   * @param {string} name file name / название файла
   * @return {boolean}
   * @private
   */
  __isFile (name) {
    return PropertiesFiles.is([...this.dir, name])
  }

  /**
   * Creating or rewriting a file
   *
   * Создание или перезапись файла
   * @param {string} name file name / название файла
   * @param {string} value values for storage / значения для хранения
   * @private
   */
  __createFile (name, value) {
    PropertiesFiles.createFile(
      this.dir,
      name,
      value,
      ''
    )
  }

  /**
   *  Reading the index.vue file
   *
   * Читает файл index.vue
   * @return {string}
   * @private
   */
  __readIndex () {
    return PropertiesFiles.readFile([...this.dir, FILE_INDEX])
  }

  /**
   * This code reads a template for the index.vue
   *
   * Читает шаблона для файла index.vue
   * @return {string}
   * @private
   */
  __readSampleIndex () {
    return PropertiesFiles.readFile([...DIR_SAMPLE, FILE_INDEX])
  }

  /**
   * This code reads a template for the props.ts
   *
   * Читает шаблона для файла props.ts
   * @return {string}
   * @private
   */
  __readSampleProps () {
    return PropertiesFiles.readFile([...DIR_SAMPLE, FILE_PROPS])
  }

  /**
   * This code reads a template for the props.design.ts
   *
   * Читает шаблона для файла props.design.ts
   * @return {string}
   * @private
   */
  __readSamplePropsDesign () {
    return PropertiesFiles.readFile([...DIR_SAMPLE, FILE_PROPS_DESIGN])
  }

  /**
   * This code reads a template for the properties.json
   *
   * Читает шаблона для файла properties.json
   * @return {string}
   * @private
   */
  __readSampleProperties () {
    return PropertiesFiles.readFile([...DIR_SAMPLE, FILE_PROPERTIES])
  }

  /**
   * Returns an array of paths to components
   *
   * Возвращает массив с путями к компонентам
   * @return {string[]}
   */
  __initDir () {
    return [
      PropertiesFiles.getRoot(),
      this.component.getDesign(),
      this.component.getComponent()
    ]
  }

  /**
   * This code generates the index.vue
   *
   * Генерация файла index.vue
   * @return {this}
   * @private
   */
  __initIndex () {
    let sample

    if (this.__isFile(FILE_INDEX)) {
      sample = this.__readIndex()
        .replace(
          /(name: ?['"])([^'"]+)(['"],? ?\/\/ name component)/,
          `$1${this.component.getName()}$3`
        )
    } else {
      sample = this.__readSampleIndex()
        .replaceAll('../../../', '../../')
        .replace('DesignComponent', this.component.getName())
    }

    this.__createFile(FILE_INDEX, sample)

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
    if (!this.__isFile(FILE_PROPS)) {
      const sample = this.__readSampleProps()

      this.__createFile(FILE_PROPS, sample)
    }

    return this
  }

  /**
   * This code generates the props.design.ts
   *
   * Генерация файла props.design.ts
   * @return {this}
   * @private
   */
  __initPropsDesign () {
    let sample = this.__readSamplePropsDesign()
    const props = this.component.getByProps()
    const templates = {
      sample: []
    }

    forEach(props, prop => {
      templates.sample.push(
        `\r\n  ${prop.name}: {` +
        `\r\n    type: ${this.__getType(prop.value)}` +
        (prop.default !== undefined ? `,\r\n    default: ${prop.default}` : '') +
        '\r\n  }'
      )
    })

    sample = sample.replace(' /* sample */ ', templates.sample.join(',') + '\r\n')

    if (sample.match('as PropType')) {
      sample = sample.replace(/(\/\/ ?)(import \{[^{]+PropType[^}]+})/, '$2')
    }

    this.__createFile(FILE_PROPS_DESIGN, sample)

    return this
  }

  /**
   * Checks if the data type is boolean
   *
   * Проверяет, является ли тип данных булевым
   * @param {(string|boolean)[]} value values to check / значения для проверки
   * @return {boolean}
   * @private
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
   * @private
   */
  __isString (value) {
    return value.length > 0 && value[0] !== true
  }

  /**
   * Returns a string with the data type
   *
   * Возвращает строку с типом данных
   * @param {(string|boolean)[]} value values to check / значения для проверки
   * @return {string}
   * @private
   */
  __getType (value) {
    const type = []
    const typeValue = []

    if (this.__isBoolean(value)) {
      type.push('Boolean')
    }

    if (this.__isString(value)) {
      type.push('String')
      value.forEach(item => typeValue.push(item === true ? 'true' : `'${item}'`))
    }

    return `[${type.join(', ')}]${typeValue.length > 0 ? ` as PropType<${typeValue.join(' | ')}>` : ''}`
  }

  /**
   * This code generates the properties.json
   *
   * Генерация файла properties.json
   * @return {this}
   * @private
   */
  __initProperties () {
    if (!this.__isFile(FILE_PROPERTIES)) {
      const sample = this.__readSampleProperties()

      this.__createFile(FILE_PROPERTIES, sample)
    }

    return this
  }
}
