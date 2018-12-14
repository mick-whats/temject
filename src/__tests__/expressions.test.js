const { expressions } = require('..')

test('expressions test', () => {
  const str = '{{name}}{{name:pascal}}{{age}}'
  const res = expressions(str)
  expect(res).toEqual(['name', 'age'])
})
test('expressions ignore string', () => {
  const str = '{{name}}{{name:pascal}}{{age}}{{foo}}{{bar}}'
  const res = expressions(str, { ignore: 'name' })
  expect(res).toEqual(['age', 'foo', 'bar'])
})
test('expressions ignore arr', () => {
  const str = '{{name}}{{name:pascal}}{{age}}{{foo}}{{bar}}'
  const res = expressions(str, { ignore: ['name', 'age'] })
  expect(res).toEqual(['foo', 'bar'])
})
test('expressions ignore unknown type', () => {
  const str = '{{name}}{{name:pascal}}{{age}}{{foo}}{{bar}}'
  // const res = expressions(str, { ignore: {} })
  expect(() => { expressions(str, { ignore: {} }) }).toThrow()
})
test('not expressions', () => {
  const str = 'test string'
  const res = expressions(str)
  expect(res).toEqual([])
})
