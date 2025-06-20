import type { Result, ResultAsync } from 'neverthrow'
import { err, fromPromise, fromThrowable, ok } from 'neverthrow'

export class BodyParseError extends Error {
  readonly __tag = 'BodyParseError'

  constructor(message: string, cause?: unknown) {
    super(message, { cause })
    this.name = 'BodyParseError'
  }
}

export const jsonBody = (body: Body): ResultAsync<unknown, BodyParseError> =>
  fromPromise(
    body.json(),
    (error) => new BodyParseError('Failed to parse JSON body', error)
  )

export const textBody = (body: Body): ResultAsync<string, BodyParseError> =>
  fromPromise(
    body.text(),
    (error) => new BodyParseError('Failed to parse text body', error)
  )

export const blobBody = (body: Body): ResultAsync<Blob, BodyParseError> =>
  fromPromise(
    body.blob(),
    (error) => new BodyParseError('Failed to parse blob body', error)
  )

export const formDataBody = (
  body: Body
): ResultAsync<FormData, BodyParseError> =>
  fromPromise(
    body.formData(),
    (error) => new BodyParseError('Failed to parse form data body', error)
  )

export const arrayBufferBody = (
  body: Body
): ResultAsync<ArrayBuffer, BodyParseError> =>
  fromPromise(
    body.arrayBuffer(),
    (error) => new BodyParseError('Failed to parse array buffer body', error)
  )

export const bytesBody = (
  body: Body
): ResultAsync<Uint8Array, BodyParseError> =>
  fromPromise(
    body.bytes(),
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
