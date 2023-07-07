const { forEach } = require('../../functions/data')

const DesignCommand = require('./DesignCommand')
const PropertiesComponent = require('./PropertiesComponent')
const DesignConstructor = require('./DesignConstructor')

/**
 * Class for creating a component or updating data
 *
 * Класс для создания компонента или обновления данных
 */
module.exports = class DesignComponent extends DesignCommand {
  dirSampleName = 'component'

  /**
   * Constructor
   * @param {string} name component name / названия компонента
   * @param {{const:boolean, update:boolean}} options additional parameters / дополнительные параметры
   */
  constructor (
    name,
    options = {}
  ) {
    super(name, options)

    this.component = new PropertiesComponent(name, false)
    this.dir = this._initDir()
  }

  initMain () {
    if (this.options.constr) {
      new DesignConstructor(this.component.getComponent(), {}).init()

      this
        .__initIndexForConstructor()
        .__initPropsForConstructor()
    } else {
      this
        .__initIndex()
        .__initProps()
    }

    this
      .__initPropsDesign()
      .__initProperties()
  }

  /**
   * Returns the names for the team
   *
   * Возвращает названия для команды
   * @return {string}
   */
  getNameCommand () {
    return this.component.getName()
  }

  /**
   * Returns an array of paths to components
   *
   * Возвращает массив с путями к компонентам
   * @return {string[]}
   */
  _initDir () {
    return [
      ...super._initDir(),
      this.component.getDesign(),
      this.component.getComponent()
    ]
  }

  /**
   *  Reading the index.vue file
   *
   * Читает файл index.vue
   * @return {string}
   * @private
   */
  __readIndex () {
    return this._read(this.component.getFileIndex())
  }

  /**
   * This code reads a template for the index.vue
   *
   * Читает шаблона для файла index.vue
   * @return {string}
   * @private
   */
  __readSampleIndex () {
    return this._readSample(this.component.getFileIndex())
  }

  /**
   * This code reads a template for the props.ts
   *
   * Читает шаблона для файла props.ts
   * @return {string}
   * @private
   */
  __readSampleProps () {
    return this._readSample(this.component.getFileProps())
  }

  /**
   * This code reads a template for the props.design.ts
   *
   * Читает шаблона для файла props.design.ts
   * @return {string}
   * @private
   */
  __readSamplePropsDesign () {
    return this._readSample(this.component.getFilePropsDesign())
  }

  /**
   * This code reads a template for the properties.json
   *
   * Читает шаблона для файла properties.json
   * @return {string}
   * @private
   */
  __readSampleProperties () {
    return this._readSample(this.component.getFileProperties())
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

    if (this._isFile(file)) {
      sample = this.__initIndexUpdate()
    } else {
      sample = this.__initIndexCreate()
    }

    this._console(file)
    this._createFile(file, sample)

    return this
  }

  /**
   * Generating the index.vue file for the constructor
   *
   * Генерация файла index.vue для конструктора
   * @return {this}
   * @private
   */
  __initIndexForConstructor () {
    const file = this.component.getFileIndex()
    const name = this.component.getComponent()
    let sample

    if (this._isFile(file)) {
      sample = this.__initIndexUpdate()
    } else {
      sample = this.__initIndexCreate()
        .replace(/( |init)(Design)/g, `$1${name}Design`)
        .replace('classes/Design', `constructors/${name}/${name}Design`)
        .replace('styles/properties', `constructors/${name}/style`)
    }

    this._console(file)
    this._createFile(file, sample)

    return this
  }

  /**
   * Updating the file index.vue
   *
   * Обновление файла index.vue
   * @return {string}
   * @private
   */
  __initIndexUpdate () {
    return this.__readIndex()
      .replace(
        /(name: ?['"])([^'"]+)(['"],? ?\/\/ name component)/,
        `$1${this.component.getName()}$3`
      )
  }

  /**
   * Creating the standard setting for index.vue
   *
   * Создание стандартной настройки index.vue
   * @return {string}
   * @private
   */
  __initIndexCreate () {
    return this.__readSampleIndex()
      .replaceAll('../../../', '../../')
      .replace('DesignComponent', this.component.getName())
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

    if (!this._isFile(file)) {
      const sample = this.__readSampleProps()

      this._console(file)
      this._createFile(file, sample)
    }

    return this
  }

  /**
   * This code generates the props.ts
   *
   * Генерация файла props.ts для конструктора
   * @return {this}
   * @private
   */
  __initPropsForConstructor () {
    const file = this.component.getFileProps()
    const name = this.component.getComponent()

    if (!this._isFile(file)) {
      const sample = this.__readSampleProps()
        .replace('props.design\'', `props.design'\r\nimport { props${name} } from '../../constructors/${name}/props'`)
        .replace('...propsDesign', `...propsDesign,\r\n  ...props${name}`)

      this._console(file)
      this._createFile(file, sample)
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
    const file = this.component.getFilePropsDesign()
    let sample = this.__readSamplePropsDesign()

    sample = this.__initPropsDesignForProps(sample)
    sample = this.__initPropsDesignForClasses(sample)

    this._console(file)
    this._createFile(file, sample)

    return this
  }

  /**
   * Generation of properties for a component
   *
   * Генерация свойств для компонента
   * @param {string} sample base template / базовый шаблон
   * @return {string}
   * @private
   */
  __initPropsDesignForProps (sample) {
    const props = this.component.getProps()
    const templates = []
    let newSample = sample

    forEach(props, prop => {
      templates.push(
        `\r\n  ${prop.name}: {` +
        `\r\n    type: ${this.__getType(prop.valueAll, prop?.style)}` +
        (prop.default !== undefined ? `,\r\n    default: ${this.__getDefault(prop.default)}` : '') +
        '\r\n  }'
      )
    })

    if (templates.length > 0) {
      newSample = sample.replace(' /* sample */ ', `${templates.join(',')}\r\n`)

      if (newSample.match('as PropType')) {
        newSample = newSample.replace(/(\/\/ ?)(import \{[^{]+PropType[^}]+})/, '$2')
      }
    }

    return newSample
  }

  /**
   * Generating a subclass for a component
   *
   * Генерация подкласса для компонента
   * @param {string} sample base template / базовый шаблон
   * @return {string}
   * @private
   */
  __initPropsDesignForClasses (sample) {
    const classes = this.component.getClasses()
    const templates = []
    let newSample = sample

    forEach(classes, (className, index) => {
      templates.push(`\r\n  ${index}: '${className}'`)
    })

    if (templates.length > 0) {
      newSample = newSample.replace(' /* classes */ ', `${templates.join(',')}\r\n`)
    }

    return newSample
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

    if (!this._isFile(file)) {
      const sample = this.__readSampleProperties()

      this._console(file)
      this._createFile(file, sample)
    }

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

    if (type.length === 0) {
      type.push('Boolean')
    }

    return `[${type.join(', ')}]${typeValue.length > 0 ? ` as PropType<${typeValue.join(' | ')}>` : ''}`
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
}
