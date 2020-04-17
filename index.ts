import Schema, { iConst, iType, iEnum, iTypeObject } from "./def"
import { thrower, stringify } from "./utils"

const langOpts = {
  expressionsDelimiter: "\n",
  typesJoin: "|"
}
, keyMethods: ((schema: Schema) => string|undefined)[] = [$const, $enum, $type] 
, {length: methodsCount} = keyMethods 
export default schema2ts
export {
  schema2ts, Schema,
  typeObject
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
  if (schema !== undefined)
    for (let i = 0; i < methodsCount; i++) {
      const v = keyMethods[i](schema)
      if (v !== undefined)
        return v
    }

  //TODO or any
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

function $type<T extends string = string>({
  "type": v, ...schema
}: Partial<
  iType<T>
  & Parameters<typeof typeObject>[0]
>) {
  if (v === undefined)
    return undefined
  const arV = Array.isArray(v) ? v : [v]
  , {length} = arV
  , $return = new Array(length)
  for (let i = 0; i < length; i++) {
    const type = arV[i]
    let result: string|undefined = undefined
    switch(type) {
      case "null": // TODO? maybe with undefined
      case "boolean":
      case "number":
      case "string":
        result = type
        break
      case "integer": 
        result = 'number'
        break
      case "object":
        result = typeObject(schema)
        result = result === undefined
        ? '{}' //or 'object' or 'Object'
        : `{\n${result}\n}`
        break
      default:
        return undefined
    }
    $return[i] = result
  }  

  return $return.join(langOpts.typesJoin)
}

function typeObject({properties}: Partial<iTypeObject>) {
  if (properties !== undefined) {
    const keys = Object.keys(properties)
    , {length} = keys
    , $return: string[] = new Array(length)

    for (let i = 0; i < length; i++) {
      const key = keys[i]
      , k = stringify(key)
      , v = schema2expr(properties[key]) 
      /* istanbul ignore if */ //TODO `thrower` from option 
      if (
        v === undefined
        || k === undefined
      )
        return undefined
      $return[i] = `${k}?: ${v}`
    }
    return $return.join(langOpts.expressionsDelimiter)
  }

  return undefined
}