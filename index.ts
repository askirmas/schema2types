import { thrower, stringify, tsAny, getNameFromRelativeRef } from "./utils"
import config from './config.json'

import {
  TopSchema, Schema,
  iConst, iType, iEnum,
  iTypeObject, iTypeArray
} from "./def"

const keyMethods: ((schema: Schema) => string|undefined)[] = [$const, $enum, $type] 
, {length: methodsCount} = keyMethods 
, {
  expressionsDelimiter,
  kvSeparator,
  optionalTerm,
  requiredTerm,
  typesJoin,
  anyObject,
  anyArray,
} = config
 
export default schema2ts
export {
  schema2ts, Schema,
  typeObject
} 

function schema2ts({definitions, ...schema}: TopSchema, name: string) {
  const defNames = definitions ? Object.keys(definitions) : []
  , defs = definitions ? Object.values(definitions) : []
  , {length} = defNames
  , $return: [string, string][] = new Array(length)

  let $main: string | void = undefined
  , mainError: string | undefined 
  
  try {
    $main = schema2expr(schema)
    /* istanbul ignore if */
    if ($main === undefined)
      throw new Error('main empty')
  } catch(e) {
    mainError = e
  }

  for (let i = 0; i < length; i++) {
    const name = defNames[i]
    , expr = schema2expr(defs[i])
    /* istanbul ignore if */
    if (expr === undefined)
      return thrower(`Empty '${name}'`)
    $return[i] = [name, expr]
  }

  if (length === 0 && mainError !== undefined)
    return thrower(mainError)

  return `${
    mainError !== undefined
    ? ''
    :
    [
      `export type ${name} = ${$main}`,
      `export default ${name}`
    ].join(expressionsDelimiter)
  }${
    length === 0 || mainError !== undefined
    ? '' 
    : expressionsDelimiter
  }${
    $return
    .map(([name, expr]) => `export type ${name} = ${expr}`)
  .join(expressionsDelimiter)
  }`
}


function schema2expr(souceSchema: Schema) {
  if (souceSchema === tsAny)
    return stringify(tsAny)

  const {$ref, ...schema} = souceSchema
  , $refName = $ref === undefined
  ? undefined
  : getNameFromRelativeRef($ref)

  let mySchema: undefined|string = undefined 
  for (let i = 0; i < methodsCount; i++) {
    mySchema = keyMethods[i](schema)
    if (mySchema !== undefined)
      break
  }
  if (mySchema === undefined && $refName === undefined)
    //TODO or any
    return thrower(`empty ${JSON.stringify({$ref, schema})}`)

  return `${
    $refName ?? ''
  }${
    mySchema !== undefined && $refName !== undefined
    ? ' & '
    : ''
  }${
    mySchema ?? ''
  }`
}

function $const({"const": v}: Partial<iConst>) {
  if (v === undefined)
    return undefined

  return stringify(v)
}

function $enum({"enum": v}: Partial<iEnum>) {
  if (v === undefined)
    return undefined
  
  return v.map(stringify).join(typesJoin)
}

function $type({"type": v, ...schema}: Partial<iType>) {
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
        result = typeObject(schema) ?? anyObject
        break
      case "array":
        result = typeArray(schema) ?? anyArray
        break
      default:
        return undefined
    }
    $return[i] = result
  }  

  return $return.join(typesJoin)
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
      //TODO with `Partial`
      , r = required && required.includes(key) ? requiredTerm : optionalTerm
      , k = stringify(key)
      , v = schema2expr(props[key]) 
      /* istanbul ignore if */ //due to `thrower` //TODO take `thrower` from option 
      if (
        v === undefined
        || k === undefined
      )
        return undefined
      $return[i] = `${k}${r}${kvSeparator}${v}`
    }
    return `{\n${$return.join(expressionsDelimiter)}\n}`
  }

  return undefined
}

function typeArray({items}: Partial<iTypeArray>) {
  if (items !== undefined) {
    //TODO items: Schema[]
    // if (Array.isArray(items))
    //   return undefined
    const v = schema2expr(items)
    /* istanbul ignore if */ //due to `thrower`
    if (v === undefined)
      return undefined
    return `(${v})[]` 
  }
  return undefined
}