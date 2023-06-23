const { forEach } = require('../../functions/data')

const PropertiesComponent = require('./PropertiesComponent')
const PropertiesFiles = require('./PropertiesFiles')

const DIR_SAMPLE = [__dirname, '..', '..', 'media', 'templates', 'component']

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
    this.component = new PropertiesComponent(name, false)

    this.dir = this.__initDir()
  }

  init () {
    console.info(`-- ${this.component.getName()}:`)

    this.__initIndex()
      .__initPropsDesign()
      .__initProps()
      .__initProperties()

    console.info('-- end')
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
    return PropertiesFiles.readFile([...this.dir, this.component.getFileIndex()])
  }

  /**
   * This code reads a template for the index.vue
   *
   * Читает шаблона для файла index.vue
   * @return {string}
   * @private
   */
  __readSampleIndex () {
    return PropertiesFiles.readFile([...DIR_SAMPLE, this.component.getFileIndex()])
  }

  /**
   * This code reads a template for the props.ts
   *
   * Читает шаблона для файла props.ts
   * @return {string}
   * @private
   */
  __readSampleProps () {
    return PropertiesFiles.readFile([...DIR_SAMPLE, this.component.getFileProps()])
  }

  /**
   * This code reads a template for the props.design.ts
   *
   * Читает шаблона для файла props.design.ts
   * @return {string}
   * @private
   */
  __readSamplePropsDesign () {
    return PropertiesFiles.readFile([...DIR_SAMPLE, this.component.getFilePropsDesign()])
  }

  /**
   * This code reads a template for the properties.json
   *
   * Читает шаблона для файла properties.json
   * @return {string}
   * @private
   */
  __readSampleProperties () {
    return PropertiesFiles.readFile([...DIR_SAMPLE, this.component.getFileProperties()])
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
    const file = this.component.getFileIndex()
    let sample

    if (this.__isFile(file)) {
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

    this.__console(file)
    this.__createFile(file, sample)

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
    const file = this.component.getFileProps()

    if (!this.__isFile(file)) {
      const sample = this.__readSampleProps()

      this.__console(file)
      this.__createFile(file, sample)
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
    const file = this.component.getFilePropsDesign()
    const props = this.component.getProps()
    const classes = this.component.getClasses()
    const templates = {
      sample: [],
      classes: []
    }

    forEach(props, prop => {
      templates.sample.push(
        `\r\n  ${prop.name}: {` +
        `\r\n    type: ${this.__getType(prop.value, prop?.style)}` +
        (prop.default !== undefined ? `,\r\n    default: ${prop.default}` : '') +
        '\r\n  }'
      )
    })

    classes.forEach(className => templates.classes.push(`'${className}'`))

    sample = sample.replace(' /* sample */ ', templates.sample.join(',') + '\r\n')
    sample = sample.replace('/* classes */', templates.classes.join(','))

    if (sample.match('as PropType')) {
      sample = sample.replace(/(\/\/ ?)(import \{[^{]+PropType[^}]+})/, '$2')
    }

    this.__console(file)
    this.__createFile(file, sample)

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
   * @param {boolean} style is the property style present / является ли свойство style
   * @return {string}
   * @private
   */
  __getType (value, style) {
    const type = []
    const typeValue = []

    if (this.__isBoolean(value)) {
      type.push('Boolean')
    }

    if (this.__isString(value)) {
      type.push('String')
      value.forEach(item => typeValue.push(item === true ? 'true' : `'${item}'`))
    }

    if (style) {
      typeValue.push('string')
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
    const file = this.component.getFileProperties()

    if (!this.__isFile(file)) {
      const sample = this.__readSampleProperties()

      this.__console(file)
      this.__createFile(file, sample)
    }

    return this
  }

  /**
   * Outputting data to the console
   *
   * Вывод данных в консоль
   * @param {string} name file name / название файла
   * @private
   */
  __console (name) {
    console.info(`--  ${this.__isFile(name) ? 'update' : 'create'} ${name}`)
  }
}
