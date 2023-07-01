const DesignCommand = require('./DesignCommand')
const PropertiesComponent = require('./PropertiesComponent')
const PropertiesFiles = require('./PropertiesFiles')

const DIR_NAME = 'constructors'
const DIR_SAMPLE = [__dirname, '..', '..', 'media', 'templates', 'constructor']

module.exports = class DesignConstructor extends DesignCommand {
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
    // TODO
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
      DIR_NAME
    ]
  }
}
