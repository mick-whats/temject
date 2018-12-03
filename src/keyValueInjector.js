const cc = require('change-case')
/**
 * temject
 *
 * @param {string} str - template-text
 * @param {Object} mix - imports
 * @return {string}
 * @example
 * const x = 'Hello, {{name:pascal}}!'
 * const y = { name: 'world' }
 * temject(x, y)
 * // -> 'Hello, World!'
 */
module.exports = function temject (str, mix) {
  const RGX = /{{(.*?)}}/g
  return str.replace(RGX, (x, key, y) => {
    const [_key, _fn] = key.split(':').map(s => s.trim())
    x = 0
    y = mix
    key = _key.split('.')
    const fn = _fn && cc[_fn] ? cc[_fn] : s => s
    while (y && x < key.length) {
      y = y[key[x++]]
    }
    return y != null ? fn(y) : ''
  })
}
