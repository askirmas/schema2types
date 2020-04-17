import Schema, { iConst, iType, iEnum } from "./def"
import { thrower } from "./utils"

const langOpts = {
  expressionsDelimiter: "\n",
  typesJoin: "|"
}

export default schema2ts
export {
  schema2ts
} 

function schema2ts(schema: Schema, name: string) {
  return [
    `export type ${name} = ${
      schema2expr(schema)
    }`,
    `export default ${name}`
  ].join(langOpts.expressionsDelimiter)
}

function schema2expr(schema: Schema) {
  const $c = $const(schema)
  if ($c !== undefined)
    return $c
  const $e = $enum(schema)
  if ($e !== undefined)
    return $e
  const $t = $type(schema)
  if ($t !== undefined)
    return $t

  thrower('empty')
}

function stringify(v: any) {
  return JSON.stringify(v)
}

function $const<T=any>({"const": v}: Partial<iConst<T>>) {
  if (v === undefined)
    return undefined

  return stringify(v)
}

function $enum<T=any>({"enum": v}: Partial<iEnum>) {
  if (v === undefined)
    return undefined
  
  return v.map(stringify).join(langOpts.typesJoin)
}

function $type<T=string>({"type": v}: Partial<iType<T>>) {
  if (v === undefined)
    return undefined

  return typeof v === 'string'
  ? v
  : Array.isArray(v)
  ? v.join(langOpts.typesJoin)
  : undefined
}
