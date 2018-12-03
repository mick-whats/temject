const dti = require('../dateTimeInjector')

test('year', () => {
  // format example "2018"
  expect(dti('{{__year}}')).toMatch(/20\d{2}/)
  expect(dti('{{__Year}}')).toMatch(/20\d{2}/)
})
test('date', () => {
  // format example "2018-12-03"
  expect(dti('{{__date}}')).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  // format example "2018/12/03"
  expect(dti('{{__Date}}')).toMatch(/^\d{4}\/\d{2}\/\d{2}$/)
})
test('datetime', () => {
  // format example "2018-12-03 21:37:34"
  const reg = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/
  expect(dti('{{__datetime}}')).toMatch(reg)
})
test('Datetime', () => {
  // format example "2018/12/03 21:37:34"
  const reg = /^\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2}$/
  expect(dti('{{__Datetime}}')).toMatch(reg)
})
test('date-and-time format', () => {
  // format example "2018/12/03 21:37:34"
  const reg = /^\d{8}$/
  expect(dti('{{__YYYYMMDD}}')).toMatch(reg)
})
test('month', () => {
  // format example "2018-12"
  expect(dti('{{__month}}')).toMatch(/^\d{4}-\d{2}$/)
  // format example "2018/12"
  expect(dti('{{__Month}}')).toMatch(/^\d{4}\/\d{2}$/)
})
test('hash4', () => {
  // example "PqvZ"
  expect(dti('{{__hash4}}')).toMatch(/^\w{4}$/)
})
test('hash8', () => {
  // example "gknJBnaW"
  expect(dti('{{__hash8}}')).toMatch(/^\w{8}$/)
})
test('hash16', () => {
  // example "96XJ8npqD4zR2Mbw"
  expect(dti('{{__hash16}}')).toMatch(/^\w{16}$/)
})
test('hash24', () => {
  // example "pX9mydNPqvZnPjeWlx0EGAnO"
  expect(dti('{{__hash24}}')).toMatch(/^\w{24}$/)
})
test('multi', () => {
  // example "olejRejN: 2018-12-04"
  expect(dti('{{__hash8}}: {{__date}}')).toMatch(/^\w{8}:\s\d{4}-\d{2}-\d{2}$/)
})
