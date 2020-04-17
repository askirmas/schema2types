import Schema, { iConst, iType, iEnum, iTypeObject } from "./def"
import { thrower, stringify, tsAny } from "./utils"

const keyMethods: ((schema: Schema) => string|undefined)[] = [$const, $enum, $type] 
, {length: methodsCount} = keyMethods 

, langOpts = {
  expressionsDelimiter: "\n",
  typesJoin: "|",
  anyObject: "{}" //or 'object' or 'Record<any, any>'
}
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
    if (schema === tsAny)
      return stringify(tsAny)
    else
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
        ? langOpts.anyObject
        : result
        break
      default:
        return undefined
    }
    $return[i] = result
  }  

  return $return.join(langOpts.typesJoin)
}

function typeObject({properties, required}: Partial<iTypeObject>) {
  const props = !properties && !required
  ? undefined
  : !required
  ? properties
  : Object.assign(
    required.reduce(
      (acc, key) => {
        if (!properties || !(key in properties))
          acc[key] = tsAny
      
        return acc
      }
    , {} as Record<string, typeof tsAny>),
    properties
  )

  if (props !== undefined) {
    const keys = Object.keys(props)
    , {length} = keys
    , $return: string[] = new Array(length)

    for (let i = 0; i < length; i++) {
      const key = keys[i]
      , r = required && required.includes(key) ? '' : '?'
      , k = stringify(key)
      , v = schema2expr(props[key]) 
      /* istanbul ignore if */ //due to `thrower` //TODO take `thrower` from option 
      if (
        v === undefined
        || k === undefined
      )
        return undefined
      $return[i] = `${k}${r}: ${v}`
    }
    return `{\n${$return.join(langOpts.expressionsDelimiter)}\n}`
  }

  return undefined
}
