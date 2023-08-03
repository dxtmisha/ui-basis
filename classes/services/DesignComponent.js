const { To } = require('../To')

const sass = require('sass')
const { pathToFileURL } = require('url')

const Properties = require('./properties/Properties')
const DesignPrototype = require('./DesignPrototype')
const DesignConstructor = require('./DesignConstructor')
const { forEach } = require('../../functions/data')

const FILE_INDEX = 'index.vue'
const FILE_PROPS = 'props.ts'
const FILE_MAP = 'map.json'
const FILE_PROPERTIES = 'properties.json'
// const FILE_SCSS = 'style.scss'
const FILE_STYLE = 'style.css'
const FILE_STORIES = 'index.stories.ts'

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

    this.properties = new Properties()
    this.properties.getBasic()
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
      .__initStyle()
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
   * Reading the index.stories.ts file
   *
   * Читает файл index.stories.ts
   * @return {string}
   * @private
   */
  __readStories () {
    return this._read(this.__getFileMainStories())
  }

  /**
   * This code reads a template for the index.vue
   *
   * Читает шаблона для файла index.vue
   * @return {string}
   * @private
   */
  __readSampleIndex () {
    return this._readSample(FILE_INDEX)
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
   * This code reads a template for the index.vue
   *
   * Читает шаблона для файла index.vue
   * @return {string}
   * @private
   */
  __readSampleStories () {
    return this._readSample(FILE_STORIES)
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
   * Returns the name for the component
   *
   * Возвращает имя для компонента
   * @return {string}
   * @private
   */
  __getFileMain () {
    return `${this.loader.getNameForFile()}.vue`
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

  __initStyle () {
    const name = this.loader.getComponent()
    let sample = `${this.properties.getScss()}\r\n`

    if (this.options.constr) {
      sample += `@import "~constructors/${name}/style.scss";\r\n`
      sample += `@include init${name}Design('${this.loader.getNameForStyle()}') {}\r\n`
    } else {
      sample += '@import "~styles/properties";\r\n'
      sample += `@include initDesign('${this.loader.getNameForStyle()}') {}\r\n`
    }

    // this._createFile(FILE_SCSS, sample)
    this._createFile(FILE_STYLE, sass.compileString(sample, {
      style: 'compressed',
      importers: [{
        findFileUrl (url) {
          if (!url.startsWith('~')) {
            return null
          } else {
            return new URL(url.substring(1), pathToFileURL('node_modules'))
          }
        }
      }]
    }).css)

    return this
  }

  __initStories () {
    const main = this.__getFileMainStories()
    let sample

    if (this._isFile(main)) {
      sample = this.__readStories()
    } else {
      sample = this.__readSampleStories()
      sample = this._replacementOnce(sample, 'basic', this.options.constr)
      sample = this._replacementOnce(sample, 'constructor', !this.options.constr)
        .replace('index.vue', this.__getFileMain())
        .replace('Design/', To.camelCaseFirst(this.loader.getDesign()))
    }

    if (sample) {
      sample = this.__replaceStoriesArgTypes(sample)
      sample = this._replacePropsDefault(sample)

      this._createFile(main, sample)
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
  __getFileMainStories () {
    return `${this.loader.getNameForFile()}.stories.ts`
  }

  /**
   * Adding default values for properties
   *
   * Добавление параметры для история
   * @param {string} sample property template / шаблон свойства
   * @return {string}
   * @protected
   */
  __replaceStoriesArgTypes (sample) {
    const props = this.loader.get()
    const templates = []

    forEach(props, ({ valueAll }, index) => {
      if (
        valueAll.length === 1 &&
        valueAll[0] === true
      ) {
        templates.push(
          `\r\n      ${index}: { control: 'boolean' }`
        )
      } else {
        const options = forEach(valueAll, value => typeof value === 'boolean' ? value : `'${value}'`)
          .join(', ')
        templates.push(
          `\r\n      ${index}: {` +
          '\r\n        control: \'select\',' +
          `\r\n        options: [${options}]` +
          '\r\n      }'
        )
      }
    })

    return this._replacement(sample, 'arg-types', templates.join(','), '    ')
  }
}
