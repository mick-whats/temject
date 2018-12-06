/**
 * expressions
 * Returns a list of template expressions
 *
 * @param {string} str - basic template strings
 * @return {Array}
 * @example
 * const str = '{{name}}{{name:pascal}}{{age}}'
 * const res = expressions(str)
 * // -> [ 'name', 'age' ]
 */
module.exports = function expressions (str) {
  const RGX = /{{(.*?)}}/g
  const m = str.match(RGX)
  console.log('m: ', m)
  return m
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
}
