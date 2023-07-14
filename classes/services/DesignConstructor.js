const DesignPrototype = require('./DesignPrototype')
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
module.exports = class DesignConstructor extends DesignPrototype {
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
      this.component.getComponent()
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
    const file = FILE_CLASS.replace(this.replaceName, this.component.getComponent())

    if (!this._isFile(file)) {
      let sample = this.__readSampleClass()

      sample = this._replacePath(sample)
      sample = this._replaceNameForProperties(sample)

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
      sample = this.__readTypes()
    } else {
      sample = this.__readSampleTypes()
      sample = this._replacePath(sample)
      sample = this._replaceName(sample)
    }

    if (sample) {
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
    } else {
      sample = this.__readSampleProps()
      sample = this._replaceName(sample)
      sample = this._replacementOnce(sample, 'constructor')
    }

    if (sample) {
      if (this._isFile(FILE_PROPERTIES)) {
        sample = this._replaceSubclass(sample)
        sample = this._replacePropsType(sample)
        sample = this._replacePropsDefault(sample)
        sample = this._replaceProps(sample, this.component.getComponent())
      }

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
      let sample = this.__readSampleStyle()

      sample = this._replacePath(sample)
      sample = this._replaceName(sample)

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

      this._createFile(file, sample)
    }

    return this
  }
}
