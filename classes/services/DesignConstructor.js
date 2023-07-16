const { To } = require('../To')

const DesignPrototype = require('./DesignPrototype')
const PropertiesComponent = require('./PropertiesComponent')
const PropertiesTool = require('./PropertiesTool')

const DIR_NAME = 'constructors'

const FILE_CLASS = 'ConstructorDesign.ts'
const FILE_TYPES = 'types.ts'
const FILE_PROPS = 'props.ts'
const FILE_STYLE = 'style.scss'
const FILE_PROPERTIES = 'properties.json'
const FILE_COMPONENT = 'ConstructorComponent.ts'

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
      .__initComponent()
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
   * Returns the names of the classes
   *
   * Возвращает названия классов
   * @return {string}
   * @private
   */
  __getClassName () {
    return FILE_CLASS.replace(this.replaceName, this.component.getComponent())
  }

  /**
   * Reads the file class.ts
   *
   * Читает файл class.ts
   * @return {string}
   * @private
   */
  __readClass () {
    return this._read(this.__getClassName())
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
   * Reads the file properties.ts
   *
   * Читает файл properties.ts
   * @return {string}
   * @private
   */
  __readProperties () {
    return this._read(FILE_PROPERTIES)
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
   * This code reads a template for the ConstructorComponent.ts
   *
   * Читает шаблона для файла ConstructorComponent.ts
   * @return {string}
   * @private
   */
  __readSampleComponent () {
    return this._readSample(FILE_COMPONENT)
  }

  /**
   * This code generates the ConstructorDesign.ts
   *
   * Генерация файла ConstructorDesign.ts
   * @return {this}
   * @private
   */
  __initClass () {
    const file = this.__getClassName()

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

  /**
   * Updates the list of connected components
   *
   * Обновляет список подключенных компонентов
   * @return {this}
   * @private
   */
  __initComponent () {
    if (this._isFile(FILE_PROPERTIES)) {
      const key = PropertiesTool.getKeyComponents()
      const data = this.__readProperties()
      const list = []

      if (key in data) {
        data[key].forEach(name => {
          const fullName = To.camelCaseFirst(`${this.component.getComponent()}-${name}`)
          const file = `${fullName}.ts`

          if (!this._isFile(file)) {
            this._createFile(file, this.__initComponentItem(name))
          }

          list.push({
            name,
            nameFirst: To.camelCaseFirst(name),
            fullName
          })
        })

        this._createFile(this.__getClassName(), this.__initComponentClass(list))
        this._createFile(FILE_TYPES, this.__initComponentType(list))
      }
    }

    return this
  }

  /**
   * Generates a class for working with components
   *
   * Генерирует класс для работы с компонентами
   * @param {string} name names of the classes / названия классов
   * @return {string}
   * @private
   */
  __initComponentItem (name) {
    const nameFirst = To.camelCaseFirst(name)
    let sample = this.__readSampleComponent()

    sample = this._replacePath(sample)
    sample = this._replacementOnce(sample, 'component', (data) => {
      return data
        .replace(/component(?!s)/g, name)
        .replace(/Component/g, nameFirst)
    })
    sample = this._replaceNameForProperties(sample)

    return sample
  }

  /**
   * Генерация подключения классы компоненты
   * @param {{name:string, fullName:string}[]} list list of classes for connection / список классов для подключения
   * @return {string}
   * @private
   */
  __initComponentClass (list) {
    const imports = []
    const variables = []
    const inits = []

    let sample = this.__readClass()

    list.forEach(item => {
      imports.push(`\r\nimport { ${item.fullName} } from './${item.fullName}'`)
      variables.push(`\r\n  protected readonly ${item.name}: ${item.fullName}`)
      inits.push(
        `\r\n    this.${item.name} = new ${item.fullName}(` +
        '\r\n      this.classes,' +
        '\r\n      this.components,' +
        '\r\n      this.props,' +
        '\r\n      this.refs' +
        '\r\n    )'
      )
    })

    sample = this._replacement(sample, 'components-import', imports.join(''), '')
    sample = this._replacement(sample, 'components-variable', variables.join(''))
    sample = this._replacement(sample, 'components-init', inits.join('\r\n'), '    ')

    return sample
  }

  /**
   * Generation of connection and addition to the list of used components
   *
   * Генерация подключения и добавления в список использованных компонентов
   * @param {{name:string, nameFirst:string}[]} list list of classes for connection / список классов для подключения
   * @return {string}
   * @private
   */
  __initComponentType (list) {
    const imports = []
    const includes = []

    let sample = this.__readTypes()

    list.forEach(item => {
      imports.push(`\r\nimport { Props${item.nameFirst}Type } from '../${item.nameFirst}/props'`)
      includes.push(`\r\n  ${item.name}?: Props${item.nameFirst}Type`)
    })

    sample = this._replacement(sample, 'components-import', imports.join(''), '')
    sample = this._replacement(sample, 'components-include', includes.join(''))

    return sample
  }
}
