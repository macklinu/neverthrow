import type { Result, ResultAsync } from 'neverthrow'
import { err, fromPromise, fromThrowable, ok } from 'neverthrow'

export class BodyParseError extends Error {
  readonly __tag = 'BodyParseError'

  constructor(message: string, cause?: unknown) {
    super(message, { cause })
    this.name = 'BodyParseError'
  }
}

export const jsonBody = (
  response: Response
): ResultAsync<unknown, BodyParseError> =>
  fromPromise(
    response.json(),
    (error) => new BodyParseError('Failed to parse JSON body', error)
  )

export const textBody = (
  response: Response
): ResultAsync<string, BodyParseError> =>
  fromPromise(
    response.text(),
    (error) => new BodyParseError('Failed to parse text body', error)
  )

export const blobBody = (
  response: Response
): ResultAsync<Blob, BodyParseError> =>
  fromPromise(
    response.blob(),
    (error) => new BodyParseError('Failed to parse blob body', error)
  )

export const formDataBody = (
  response: Response
): ResultAsync<FormData, BodyParseError> =>
  fromPromise(
    response.formData(),
    (error) => new BodyParseError('Failed to parse form data body', error)
  )

export const arrayBufferBody = (
  response: Response
): ResultAsync<ArrayBuffer, BodyParseError> =>
  fromPromise(
    response.arrayBuffer(),
    (error) => new BodyParseError('Failed to parse array buffer body', error)
  )

export const bytesBody = (
  response: Response
): ResultAsync<Uint8Array, BodyParseError> =>
  fromPromise(
    response.bytes(),
    (error) => new BodyParseError('Failed to parse bytes body', error)
  )

export class ResponseCloneError extends Error {
  readonly __tag = 'ResponseCloneError'

  constructor(message: string, cause?: unknown) {
    super(message, { cause })
    this.name = 'ResponseCloneError'
  }
}

export const cloneResponse = (
  response: Response
): Result<Response, ResponseCloneError> =>
  fromThrowable(
    response.clone,
    (error) => new ResponseCloneError('Failed to clone response', error)
  )()

export class HeaderNotFoundError extends Error {
  readonly __tag = 'HeaderNotFoundError'

  constructor(name: string) {
    super(`Header ${JSON.stringify(name)} not found`)
    this.name = 'HeaderNotFoundError'
  }
}

export const getRequiredHeader = (
  headers: Headers,
  name: string
): Result<string, HeaderNotFoundError> => {
  const header = headers.get(name)
  return header ? ok(header) : err(new HeaderNotFoundError(name))
}
