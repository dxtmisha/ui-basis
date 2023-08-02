const { To } = require('../To')

const DesignPrototype = require('./DesignPrototype')
const DesignConstructor = require('./DesignConstructor')

const FILE_INDEX = 'index.vue'
const FILE_PROPS = 'props.ts'
const FILE_MAP = 'map.json'
const FILE_PROPERTIES = 'properties.json'

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
   * @param {{const:boolean}} options additional parameters / дополнительные параметры
   */
  constructor (
    name,
    options = {}
  ) {
    super(name, options)

    this.dir = this._initDir()
  }

  initMain () {
    if (this.options.constr) {
      new DesignConstructor(To.kebabCase(this.loader.getComponent()), {}).init()
    }

    this
      .__initIndex()
      .__initProps()
      .__initMap()
      .__initProperties()
  }

  /**
   * Returns the names for the team
   *
   * Возвращает названия для команды
   * @return {string}
   */
  getNameCommand () {
    return this.loader.getName()
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
      this.loader.getDesign(),
      this.loader.getComponent()
    ]
  }

  /**
   * Reading the index.vue file
   *
   * Читает файл index.vue
   * @return {string}
   * @private
   */
  __readIndex () {
    return this._read(this.__getFileMain())
  }

  /**
   *  Reading the props.ts file
   *
   * Читает файл props.ts
   * @return {string}
   * @private
   */
  __readProps () {
    return this._read(FILE_PROPS)
  }

  /**
   * This code reads a template for the index.vue
   *
   * Читает шаблона для файла index.vue
   * @return {string}
   * @private
   */
  __readSampleIndex () {
    return this._readSample(this.__getFileIndex())
  }

  /**
   * Returns the filename index
   *
   * Возвращает название файла index
   * @return {string}
   * @private
   */
  __getFileIndex () {
    return FILE_INDEX
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
   * @return {Object<string,*>}
   * @private
   */
  __readSampleProperties () {
    return this._readSample(FILE_PROPERTIES)
  }

  /**
   * This code generates the index.vue
   *
   * Генерация файла index.vue
   * @return {this}
   * @private
   */
  __initIndex () {
    const main = this.__getFileMain()
    let sample

    if (this._isFile(main)) {
      sample = this.__readIndex()
    } else {
      sample = this.__readSampleIndex()
      sample = this._replacementOnce(sample, 'basic', this.options.constr)
      sample = this._replacementOnce(sample, 'constructor', !this.options.constr)
    }

    if (sample) {
      sample = this._replacement(
        sample,
        'name-class',
        `\r\n  '${this.loader.getName()}',`
      )

      sample = this._replacement(
        sample,
        'name-component',
        `\r\n  name: '${this.loader.getNameForFile()}'`
      )

      sample = this._replacement(
        sample,
        'name-style',
        `\r\n$componentName: '${this.loader.getNameForStyle()}';`,
        ''
      )

      this._createFile(main, sample)
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
    let sample

    if (this._isFile(FILE_PROPS)) {
      sample = this.__readProps()
    } else {
      sample = this.__readSampleProps()
      sample = this._replacementOnce(sample, 'basic', this.options.constr)
      sample = this._replacementOnce(sample, 'constructor', !this.options.constr)
    }

    if (sample) {
      sample = this._replaceSubclass(sample)
      sample = this._replacePropsType(sample)
      sample = this._replacePropsDefault(sample)
      sample = this._replaceProps(sample, '')

      this._createFile(FILE_PROPS, sample)
    }

    return this
  }

  /**
   * This code generates the map.json
   *
   * Генерация файла map.json
   * @return {this}
   * @private
   */
  __initMap () {
    this._createFile(FILE_MAP, this.loader.getJson())
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
    if (!this._isFile(FILE_PROPERTIES)) {
      const sample = this.__readSampleProperties()

      if (this.options.constr) {
        sample.basic = `{d.${To.kebabCase(this.loader.getComponent())}}`
      }

      this._createFile(FILE_PROPERTIES, sample)
    }

    return this
  }

  /**
   * Returns the name for the component
   *
   * Возвращает имя для компонента
   * @return {string}
   * @private
   */
  __getFileMain () {
    return `${this.loader.getNameForFile()}.vue`
  }
}
