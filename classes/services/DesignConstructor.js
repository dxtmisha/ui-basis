const DesignCommand = require('./DesignCommand')

const DIR_NAME = 'constructors'

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
    // TODO
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
      DIR_NAME
    ]
  }
}
