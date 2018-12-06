const { expressions } = require('..')

test('expressions test', () => {
  const str = '{{name}}{{name:pascal}}{{age}}'
  const res = expressions(str)
  expect(res).toEqual(['name', 'age'])
})
test('not expressions', () => {
  const str = 'test string'
  const res = expressions(str)
  expect(res).toEqual([])
})
