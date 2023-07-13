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
   * @param {{const:boolean, options:boolean}} options additional parameters / дополнительные параметры
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
    return this._read(this.component.getFileMain())
  }

  /**
   * This code reads a template for the index.vue
   *
   * Читает шаблона для файла index.vue
   * @return {string}
   * @private
   */
  __readSampleIndex () {
    return this._readSample(this.component.getFileIndex(!this.options.options))
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
    const main = this.component.getFileMain()
    let sample

    if (this._isFile(main)) {
      sample = this.__initIndexUpdate()
    } else {
      sample = this.__initIndexCreate()
    }

    this._console(main)
    this._createFile(main, sample)

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
    const main = this.component.getFileMain()
    const name = this.component.getComponent()
    let sample

    if (this._isFile(main)) {
      sample = this.__initIndexUpdate()
    } else {
      sample = this.__initIndexCreate()
        .replace(/( |init)(Design)/g, `$1${name}Design`)
        .replace('classes/Design', `constructors/${name}/${name}Design`)
        .replace('styles/properties', `constructors/${name}/style`)

      if (!this.options.options) {
        sample = sample
          .replace('Design } from', `Design, ${name}DesignEmitsType, ${name}DesignSlotsType } from`)
          .replace('defineEmits([])', `defineEmits<${name}DesignEmitsType>()`)
          .replace('// defineSlots,', 'defineSlots,')
          .replace('// defineSlots()', `defineSlots<${name}DesignSlotsType>()`)
      }
    }

    this._console(main)
    this._createFile(main, sample)

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
      .replaceAll('../../../', this.getRoot())
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
      const sample = this.__initPropsForLink()

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
      let sample = this.__initPropsForLink()

      if (this.options.options) {
        sample = sample
          .replace(
            'props.design\'',
            `props.design'\r\nimport { props${name} } from '${this.getRoot()}constructors/${name}/props'`
          )
          .replace(' ...propsDesign ', `\r\n  ...propsDesign,\r\n  ...props${name}\r\n`)
      } else {
        sample = sample
          .replace(
            'props.design\'',
            `props.design'\r\nimport { Props${name}Interface, defaults${name} } from '${this.getRoot()}constructors/${name}/props'`
          )
          .replace(
            'export interface PropsInterface extends PropsDesignInterface',
            `export type PropsInterface = PropsDesignInterface & Props${name}Interface`
          )
          .replace(' ...defaultsDesign ', `\r\n  ...defaultsDesign,\r\n  ...defaults${name}\r\n`)
      }

      this._console(file)
      this._createFile(file, sample)
    }

    return this
  }

  /**
   * Returns the content of the props.ts file with the corrected path
   *
   * Возвращает содержимое файла props.ts с исправленным путем
   * @return {string}
   * @private
   */
  __initPropsForLink () {
    let sample = this.__readSampleProps()
      .replaceAll('../../../', this.getRoot())

    if (this.options.options) {
      sample = sample
        .replace('// propsDesign,', 'propsDesign,')
        .replace('// export const props', 'export const props')
    } else {
      sample = sample
        .replace('// PropsDesignInterface', 'PropsDesignInterface')
        .replace('// defaultsDesign', 'defaultsDesign')
        .replace('// export interface PropsInterface', 'export interface PropsInterface')
        .replace('// export const defaults', 'export const defaults')
    }

    return sample
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

    sample = this.options.options
      ? this.__initPropsDesignForPropsByOptions(sample)
      : this.__initPropsDesignForProps(sample)

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
    const defaults = []

    forEach(props, prop => {
      templates.push(
        `\r\n  ${prop.name}?: ${this.component.getTypeByName(prop.valueAll, prop?.style)}`
      )

      if (prop.default !== undefined) {
        defaults.push(
          `\r\n  ${prop.name}: ${this.component.getDefault(prop.default)}`
        )
      }
    })

    if (templates.length > 0) {
      return sample
        .replace('// export interface PropsDesignInterface', 'export interface PropsDesignInterface')
        .replace('// export const defaultsDesign', 'export const defaultsDesign')
        .replace(' /* interface */ ', `${templates.join(',')}\r\n`)
        .replace(' /* defaults */ ', `${defaults.join(',')}\r\n`)
    } else {
      return sample
    }
  }

  /**
   * Generation of properties for a component
   *
   * Генерация свойств для компонента
   * @param {string} sample base template / базовый шаблон
   * @return {string}
   * @private
   */
  __initPropsDesignForPropsByOptions (sample) {
    const props = this.component.getProps()
    const templates = []
    let newSample = sample

    forEach(props, prop => {
      templates.push(
        `\r\n  ${prop.name}: {` +
        `\r\n    type: ${this.component.getTypeOptionsByName(prop.valueAll, prop?.style)}` +
        (prop.default !== undefined ? `,\r\n    default: ${this.component.getDefault(prop.default)}` : '') +
        '\r\n  }'
      )
    })

    if (templates.length > 0) {
      newSample = sample
        .replace('// export const propsDesign', 'export const propsDesign')
        .replace(' /* sample */ ', `${templates.join(',')}\r\n`)

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
}
