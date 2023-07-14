const DesignPrototype = require('./DesignPrototype')
const PropertiesComponent = require('./PropertiesComponent')
const DesignConstructor = require('./DesignConstructor')

/**
 * Class for creating a component or updating data
 *
 * Класс для создания компонента или обновления данных
 */
module.exports = class DesignComponent extends DesignPrototype {
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
      new DesignConstructor(this.component.getComponent().toLowerCase(), {}).init()
    }

    this
      .__initIndex()
      .__initTypes()
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
   *  Reading the types.ts file
   *
   * Читает файл types.ts
   * @return {string}
   * @private
   */
  __readTypes () {
    return this._read(this.component.getFileTypes())
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
  __readSampleTypes () {
    return this._readSample(this.component.getFileTypes())
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
      sample = this.__readIndex()
    } else {
      sample = this.__readSampleIndex()
      sample = this._replacementOnce(sample, 'basic', this.options.constr)
      sample = this._replacementOnce(sample, 'constructor', !this.options.constr)
    }

    if (sample) {
      sample = this._replacement(sample, 'name', `\r\n  name: '${this.component.getName()}'`)

      this._createFile(main, sample)
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
    const file = this.component.getFileTypes()
    let sample

    if (this._isFile(file)) {
      sample = this.__readTypes()
    } else {
      sample = this.__readSampleTypes()
      sample = this._replacementOnce(sample, 'constructor', !this.options.constr)
    }

    if (sample) {
      sample = this._replaceSubclass(sample)
      sample = this._replacePropsType(sample)
      sample = this._replacePropsDefault(sample)
      sample = this._replaceProps(sample, '')

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
    const file = this.component.getFileProperties()

    if (!this._isFile(file)) {
      let sample = this.__readSampleProperties()

      if (this.options.constr) {
        sample = sample.replace('{', `{\r\b  "basic": "{${this.component.getNameForStyle()}}"`)
      }

      this._createFile(file, sample)
    }

    return this
  }
}
