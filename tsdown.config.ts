import { defineConfig } from 'tsdown/config'

const production = process.env.NODE_ENV === 'production'

export default defineConfig({
  entry: ['src/**/*.ts', '!src/**/*.test.ts'],
  clean: true,
  outDir: 'dist',
  format: 'esm',
  dts: true,
  sourcemap: production,
  treeshake: production,
  attw: production && { profile: 'esmOnly' },
})
