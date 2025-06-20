# @macklinu/neverthrow

> A collection of utilities used alongside [neverthrow](https://github.com/supermacro/neverthrow)

## Installation

```sh
pnpm add neverthrow @macklinu/neverthrow
```

## Usage

This library is grouped into various modules by scope or library.

### `/zod`

If using this module, ensure you have [`zod`](https://zod.dev/) installed.

```sh
pnpm add zod
```

#### `zodParse()`

A wrapper around zod/v4's schema parsing functionality to convert it into a `Result`.

```ts
import { zodParse } from '@macklinu/neverthrow/zod'
import { z } from 'zod/v4'

const Schema = z.string()

zodParse(Schema, 'hello') // => ok('hello')
zodParse(Schema, 1) // => err(z.ZodError)
```
