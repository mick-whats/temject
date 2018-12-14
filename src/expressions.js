/**
 * expressions
 * Returns a list of template expressions
 *
 * @param {string} str - basic template strings
 * @param {Object} opts - options
 * @return {Array}
 * @example
 * const str = '{{name}}{{name:pascal}}{{age}}'
 * const res = expressions(str)
 * // -> [ 'name', 'age' ]
 */
module.exports = function expressions (str, opts = {}) {
  const RGX = /{{(.*?)}}/g
  const m = str.match(RGX)
  const ignore = (() => {
    if (opts.ignore && typeof opts.ignore === 'string') {
      return [opts.ignore]
    } else if (Array.isArray(opts.ignore)) {
      return opts.ignore
    } else if (opts.ignore) {
      throw new Error('options.ignore is unmatch type')
    } else {
      return []
    }
  })()
  // const ignore = opts.ignore
  //   ? typeof opts.ignore === 'string'
  //     ? [opts.ignore]
  //     : Array.isArray(opts.ignore)
  //     ? opts.ignore
  //     : throw new Error('options.ignore is unmatch type')
  //   : null

  const arr = m
    ? str
      .match(RGX)
      .map(item => {
        return item
          .replace(/[{}]/g, '')
          .split(':')
          .map(s => s.trim())[0]
      })
      .filter((x, i, me) => me.indexOf(x) === i)
    : []
  return ignore.length
    ? arr.filter(item => {
      return !ignore.includes(item)
    })
    : arr
}
