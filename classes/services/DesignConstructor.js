const { To } = require('../To')

const DesignCommand = require('./DesignCommand')

const DIR_NAME = 'constructors'

const FILE_CLASS = 'ConstructorDesign.ts'
const FILE_PROPS = 'props.ts'
const FILE_STYLE = 'style.scss'
const FILE_PROPERTIES = 'properties.json'

module.exports = class DesignConstructor extends DesignCommand {
  dirSampleName = 'constructor'

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

    this.dir = this._initDir()
  }

  initMain () {
    this
      .__initClass()
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
        .replaceAll('../../../', '../../')
        .replaceAll('propsConstructor', To.camelCase(`props-${this.name}`))
        .replaceAll('ConstructorDesign', To.camelCaseFirst(`${this.name}-design`))

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

    if (!this._isFile(file)) {
      const sample = this.__readSampleProps()
        .replace('propsConstructor', To.camelCase(`props-${this.name}`))

      this._console(file)
      this._createFile(file, sample)
    }

    return this
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
        .replaceAll('../../../', '../../')
        .replace('initConstructorDesign', To.camelCase(`init-${this.name}-design`))

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
