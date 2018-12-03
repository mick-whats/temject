const fn = require('../keyValueInjector')
test('basic :: object', () => {
  const x = 'Hello, {{name:pascal}}!'
  const y = { name: 'world' }
  expect(fn(x, y)).toBe('Hello, World!')
})

test('basic :: array', () => {
  const x = 'Hello, {{0:upper}}!'
  const y = ['world']
  expect(fn(x, y)).toBe('Hello, WORLD!')
})

test('repeats', () => {
  expect(fn('{{0:camel}}{{0:pascal}}{{0:dot}}', ['toDo'])).toBe('toDoToDoto.do')
  expect(fn('{{x:constant}}{{x:header}}{{x:snake}}', { x: 'toDO' })).toBe(
    'TO_DOTo-Doto_do'
  )
})
test('invalid key ~> empty string', () => {
  const obj = { a: 1, b: 2 }
  expect(fn('{{a}}{{d}}{{b:camel}}', obj)).toBe('12')
  expect(fn('{{d:snake}}', obj)).toBe('')
  const arr = [1, 2]
  expect(fn('{{0}}{{9:pascal}}{{1}}', arr)).toBe('12')
  expect(fn('{{9:dot}}', arr)).toBe('')
})
test('null keys', () => {
  const obj = { a: null, b: undefined }
  expect(fn('{{a:camel}}~{{b:pascal}}', obj)).toBe('~')
  const arr = [null, undefined]
  expect(fn('{{0:dot}}~{{1:dot}}~{{2:dot}}', arr)).toBe('~~')
})
test('nested keys', () => {
  const obj = {
    name: 'John',
    foo: {
      bar: {
        baz: 'Smith'
      }
    }
  }
  expect(fn('{{name:lower}} {{foo.bar.baz:lower}}', obj)).toBe('john smith')
  const arr = ['John', [[['Smith']]]]
  expect(fn('{{0:lower}} {{1.0.0:lower}}', arr)).toBe('john smith')
})
test('nested keys (invalid)', () => {
  const obj = { foo: 123 }
  expect(fn('{{foo.bar:camel}}', obj)).toBe('')
  expect(fn('{{foo.bar.baz:pascal}}', obj)).toBe('')
  const arr = [123]
  expect(fn('{{0.1:snake}}', arr)).toBe('')
  expect(fn('{{0.1.2:dot}}', arr)).toBe('')
})
test('trim keys (whitespace)', () => {
  const obj = { foo: 'ABC', bar: { baz: 'def' } }
  expect(fn('{{  foo : lower }}', obj)).toBe('abc')
  expect(fn('{{  bar.baz : upper }}', obj)).toBe('DEF')
  const arr = ['Xyz', ['lmn']]
  expect(fn('{{ 0 : lower }}', arr)).toBe('xyz')
  expect(fn('{{ 1.0 : upper }}', arr)).toBe('LMN')
})
test('multiline string', () => {
  const obj = { foo: 'lowPrice', bar: 'highPrice' }
  expect(
    fn('\nApples: {{foo:sentence}}\n\nOranges: {{bar:sentence}}', obj)
  ).toBe('\nApples: Low price\n\nOranges: High price')
  expect(
    fn(
      `
\tApples: {{foo:param}}
\tOranges: {{bar:header}}`,
      obj
    )
  ).toBe('\n\tApples: low-price\n\tOranges: High-Price')
})
test('mixed datatype', () => {
  const arr = [4, 5, 'baz']
  arr.foo = 'hello'
  arr.bar = 'world'
  expect(fn('{{foo:upper}}, {{bar:upper}}! {{0}}{{1}}{{2:upper}}', arr)).toBe(
    'HELLO, WORLD! 45BAZ'
  )
})

test('currying', () => {
  const x = fn.bind(null, 'Hello, {{name:upper}}')
  let arr = ['Jack', 'Jill', 'John'].map(name => x({ name }))
  expect(arr).toEqual(['Hello, JACK', 'Hello, JILL', 'Hello, JOHN'])
})
