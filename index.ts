import Schema, { iConst, iType, iEnum } from "./def"
import { thrower, stringify } from "./utils"

const langOpts = {
  expressionsDelimiter: "\n",
  typesJoin: "|"
}
, keyMethods: ((schema: Schema) => string|undefined)[] = [$const, $enum, $type] 
, {length: methodsCount} = keyMethods 
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
  for (let i = 0; i < methodsCount; i++) {
    const v = keyMethods[i](schema)
    if (v !== undefined)
      return v
  }

  return thrower('empty')
}

function $const<T=any>({"const": v}: Partial<iConst<T>>) {
  if (v === undefined)
    return undefined

  return stringify(v)
}

function $enum<T=any>({"enum": v}: Partial<iEnum<T>>) {
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
