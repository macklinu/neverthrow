import { err, ok, Result } from 'neverthrow'
import { z } from 'zod/v4'

export const zodParse = <T>(
  schema: z.ZodType<T>,
  data: unknown
): Result<T, z.ZodError<T>> => {
  const result = schema.safeParse(data)
  return result.success ? ok(result.data) : err(result.error)
}
