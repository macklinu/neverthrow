import { test, expect } from 'vitest'
import { z } from 'zod/v4'
import { zodParse } from './zod'
import { err, ok } from 'neverthrow'

test('returns ok for valid schema parsing', () => {
  const schema = z.object({ name: z.string(), age: z.number() })
  const data = { name: 'Alice', age: 30 }

  expect(zodParse(schema, data)).toEqual(ok(data))
})

test('returns error for invalid schema parsing', () => {
  const schema = z.object({ name: z.string(), age: z.number() })
  const data = { name: 'Alice', age: 'thirty' }

  expect(zodParse(schema, data)).toEqual(err(expect.any(z.ZodError)))
})
