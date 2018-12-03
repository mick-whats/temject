const fn = require('..').temject
test('basic :: object', () => {
  const x = 'Hello, {{name:pascal}}! Today is {{__date}}'
  const y = { name: 'world' }
  // example "Hello, World! Today is 2018-12-04"
  expect(fn(x, y)).toMatch(/^Hello, World!/)
  expect(fn(x, y)).toMatch(/Today is \d{4}-\d{2}-\d{2}$/)
})

test('basic :: array', () => {
  const x = 'Hello, {{0:upper}}! Today is {{__date}}'
  const y = ['world']
  expect(fn(x, y)).toMatch(/^Hello, WORLD!/)
  expect(fn(x, y)).toMatch(/Today is \d{4}-\d{2}-\d{2}$/)
})

// test('readme', () => {
//   const x = `// createdAt: {{__date}}
//   // path/to/MyProject/{{name}}.js
//
//   class {{name:pascal}} {constructor(arguments) {}}`
//   const y = { name: 'myFunction' }
//   expect(fn(x, y)).toBe(`// createdAt: 2018-12-04
//   // path/to/MyProject/myFunction.js
//
//   class MyFunction {constructor(arguments) {}}`)
// })

// test.skip('readme 2', () => {
//   console.log(
//     '\n', '{{__year}} : ', fn('{{__year}}'),
//     '\n', '{{__date}} : ', fn('{{__date}}'),
//     '\n', '{{__Date}} : ', fn('{{__Date}}'),
//     '\n', '{{__datetime}} : ', fn('{{__datetime}}'),
//     '\n', '{{__Datetime}} : ', fn('{{__Datetime}}'),
//     '\n', '{{__month}} : ', fn('{{__month}}'),
//     '\n', '{{__Month}} : ', fn('{{__Month}}'),
//     '\n', '{{__ddd MMM DD YYYY}} : ', fn('{{__ddd MMM DD YYYY}}'),
//     '\n', '{{__hh:mm A [GMT]Z}} : ', fn('{{__hh:mm A [GMT]Z}}'),
//     '\n', 'Today is {{__dddd}} : ', fn('Today is {{__dddd}}'),
//     '\n', '{{__hash8}} : ', fn('{{__hash8}}'),
//     '\n', '{{__hash16}} : ', fn('{{__hash16}}'),
//     '\n', '{{__hash24}} : ', fn('{{__hash24}}')
//   )
// })
// test.skip('readme 3', () => {
//   const o = { key: 'helloWorld' }
//   console.log(
//     '\n', '{{key: camel}} : ', fn('{{key: camel}}', o),
//     '\n', '{{key: constant}} : ', fn('{{key: constant}}', o),
//     '\n', '{{key: dot}} : ', fn('{{key: dot}}', o),
//     '\n', '{{key: header}} : ', fn('{{key: header}}', o),
//     '\n', '{{key: isLower}} : ', fn('{{key: isLower}}', o),
//     '\n', '{{key: isUpper}} : ', fn('{{key: isUpper}}', o),
//     '\n', '{{key: lower}} : ', fn('{{key: lower}}', o),
//     '\n', '{{key: lcFirst}} : ', fn('{{key: lcFirst}}', o),
//     '\n', '{{key: no}} : ', fn('{{key: no}}', o),
//     '\n', '{{key: param}} : ', fn('{{key: param}}', o),
//     '\n', '{{key: pascal}} : ', fn('{{key: pascal}}', o),
//     '\n', '{{key: path}} : ', fn('{{key: path}}', o),
//     '\n', '{{key: sentence}} : ', fn('{{key: sentence}}', o),
//     '\n', '{{key: snake}} : ', fn('{{key: snake}}', o),
//     '\n', '{{key: swap}} : ', fn('{{key: swap}}', o),
//     '\n', '{{key: title}} : ', fn('{{key: title}}', o),
//     '\n', '{{key: upper}} : ', fn('{{key: upper}}', o),
//     '\n', '{{key: ucFirst}} : ', fn('{{key: ucFirst}}', o)
//   )
// })
