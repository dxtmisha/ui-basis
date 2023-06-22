const DesignLoader = require('../../classes/services/DesignLoader')

/**
 * @param {string} source
 * @this {Object<string,*>}
 * @return {string}
 */
module.exports = function (source) {
  return new DesignLoader(this.resourcePath, source).to()
}
