const date = require('date-and-time')
const Hashids = require('hashids')
const hash = (n = 4) => {
  const id = new Hashids(Date.now(), 4).encode(1)
  return new Hashids(id, n).encode(1)
}
/**
 * dateTimeInjector
 *
 * @param {string} str - before injection text
 * @return {string}
 * @example
 * dateTimeInjector('{{__hash8}}: {{__date}}')
 * // -> 'olejRejN: 2018-12-04
 */
module.exports = function dateTimeInjector (str) {
  const RGX = /{{__(.*?)}}/g
  return str.replace(RGX, (x, key, y) => {
    key = key.trim()
    switch (key) {
      case 'year':
        break

      default:
        break
    }
    const now = new Date()
    const dt = date.format.bind(null, now)
    const res = (() => {
      switch (key) {
        case 'hash4':
          return hash()
        case 'hash8':
          return hash(8)
        case 'hash16':
          return hash(16)
        case 'hash24':
          return hash(24)
        case 'Year':
        case 'year':
          return dt('YYYY')
        case 'date':
          return dt('YYYY-MM-DD')
        case 'Date':
          return dt('YYYY/MM/DD')
        case 'datetime':
          return dt('YYYY-MM-DD HH:mm:ss')
        case 'Datetime':
          return dt('YYYY/MM/DD HH:mm:ss')
        case 'month':
          return dt('YYYY-MM')
        case 'Month':
          return dt('YYYY/MM')
        default:
          return dt(key)
      }
    })()
    return res != null ? res : ''
  })
}
