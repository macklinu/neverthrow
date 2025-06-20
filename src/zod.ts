import type { Result } from 'neverthrow'
import { err, ok } from 'neverthrow'
import type { z } from 'zod/v4'

export const zodParse = <T>(
  schema: z.ZodType<T>,
  data: unknown
): Result<T, z.ZodError<T>> => {
  const result = schema.safeParse(data)
  return result.success ? ok(result.data) : err(result.error)
}
