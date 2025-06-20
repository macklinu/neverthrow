import { test, expect } from 'vitest'
import { jsonParse, JSONParseError } from './json'
import { err, ok } from 'neverthrow'

test('jsonParse should parse valid JSON', () => {
  const result = jsonParse('{"key": "value"}')

  expect(result).toEqual(ok({ key: 'value' }))
})

test('jsonParse should return an error for invalid JSON', () => {
  const result = jsonParse('{"key": "value"')

  expect(result).toEqual(err(expect.any(JSONParseError)))
})
