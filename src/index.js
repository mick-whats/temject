const dateTimeInjector = require('./dateTimeInjector')
const keyValueInjector = require('./keyValueInjector')

module.exports.dateTimeInjector = dateTimeInjector
module.exports.keyValueInjector = keyValueInjector

/**
 *
 *
 * @param {string} str - 変換したい文字列を含んだテキスト
 * @param {Object} mix - injectしたいkey:valueを含んだobject
 * @return {string}
 * @example
 * const x = 'Hello, {{name:pascal}}! Today is {{__date}}'
 * const y = { name: 'world' }
 * temject(x, y)
 * // -> "Hello, World! Today is 2018-12-04"
 */
function temject (str, mix) {
  str = dateTimeInjector(str)
  return keyValueInjector(str, mix)
}

module.exports.temject = temject
