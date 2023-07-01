const { To } = require('../To')

const DesignCommand = require('./DesignCommand')

const DIR_NAME = 'constructors'

const FILE_PROPS = 'props.ts'

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
      .__initProps()
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
}
