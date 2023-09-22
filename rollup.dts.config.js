import dts from 'rollup-plugin-dts'
import { readFileSync } from 'fs'
const pkg = JSON.parse(readFileSync('./package.json'))

export default [
  {
    input: './types/index.d.ts',
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [dts()],
  },
]
