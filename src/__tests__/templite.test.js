const fn = require('../../src/keyValueInjector')

test('basic :: object', () => {
  const x = 'Hello, {{name}}!'
  const y = { name: 'world' }
  expect(fn(x, y)).toBe('Hello, world!')
})

test('basic :: array', () => {
  const x = 'Hello, {{0}}!'
  const y = ['world']
  expect(fn(x, y)).toBe('Hello, world!')
})

test('repeats', () => {
  expect(fn('{{0}}{{0}}{{0}}', ['🎉'])).toBe('🎉🎉🎉')
  expect(fn('{{x}}{{x}}{{x}}', { x: 'hi~' })).toBe('hi~hi~hi~')
})

test('invalid key ~> empty string', () => {
  const obj = { a: 1, b: 2 }
  expect(fn('{{a}}{{d}}{{b}}', obj)).toBe('12')
  expect(fn('{{d}}', obj)).toBe('')
  const arr = [1, 2]
  expect(fn('{{0}}{{9}}{{1}}', arr)).toBe('12')
  expect(fn('{{9}}', arr)).toBe('')
})

test('null keys', () => {
  const obj = { a: null, b: undefined }
  expect(fn('{{a}}~{{b}}', obj)).toBe('~')
  const arr = [null, undefined]
  expect(fn('{{0}}~{{1}}~{{2}}', arr)).toBe('~~')
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
  expect(fn('{{name}} {{foo.bar.baz}}', obj)).toBe('John Smith')
  const arr = ['John', [[['Smith']]]]
  expect(fn('{{0}} {{1.0.0}}', arr)).toBe('John Smith')
})

test('nested keys (invalid)', () => {
  const obj = { foo: 123 }
  expect(fn('{{foo.bar}}', obj)).toBe('')
  expect(fn('{{foo.bar.baz}}', obj)).toBe('')
  const arr = [123]
  expect(fn('{{0.1}}', arr)).toBe('')
  expect(fn('{{0.1.2}}', arr)).toBe('')
})

test('trim keys (whitespace)', () => {
  const obj = { foo: 123, bar: { baz: 456 } }
  expect(fn('{{  foo  }}', obj)).toBe('123')
  expect(fn('{{  bar.baz  }}', obj)).toBe('456')
  const arr = [123, [456]]
  expect(fn('{{ 0 }}', arr)).toBe('123')
  expect(fn('{{ 1.0 }}', arr)).toBe('456')
})

test('multiline string', () => {
  const obj = { foo: 123, bar: 456 }
  expect(fn('\nApples: {{foo}}\n\nOranges: {{bar}}', obj)).toBe(
    '\nApples: 123\n\nOranges: 456'
  )
  expect(
    fn(
      `
\tApples: {{foo}}
\tOranges: {{bar}}`,
      obj
    )
  ).toBe('\n\tApples: 123\n\tOranges: 456')
})

test('mixed datatype', () => {
  const arr = [4, 5, 6]
  arr.foo = 'hello'
  arr.bar = 'world'
  expect(fn('{{foo}}, {{bar}}! {{0}}{{1}}{{2}}', arr)).toBe('hello, world! 456')
})

test('allows "0" value', () => {
  expect(fn('{{0}} & {{1}}', [0, -1])).toBe('0 & -1')
})

test('currying', () => {
  const x = fn.bind(null, 'Hello, {{name}}')
  const arr = ['Jack', 'Jill', 'John'].map(name => x({ name }))
  expect(arr).toEqual(['Hello, Jack', 'Hello, Jill', 'Hello, John'])
})
