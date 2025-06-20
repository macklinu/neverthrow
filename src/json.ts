import type { Result } from 'neverthrow'
import { fromThrowable } from 'neverthrow'

export class JSONParseError extends Error {
  readonly __tag = 'JSONParseError'

  constructor(message: string, cause?: unknown) {
    super(message, { cause })
    this.name = 'JSONParseError'
  }
}

export const jsonParse = (
  ...args: Parameters<typeof JSON.parse>
): Result<unknown, JSONParseError> =>
  fromThrowable(
    JSON.parse,
    (error) => new JSONParseError('Error calling JSON.parse', error)
  )(...args)
