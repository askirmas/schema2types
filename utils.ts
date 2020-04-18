import {anyThing, nameFromRelRef} from './config.json'

const tsAny = {toString: anyThing} as const
, nameFromRelRefExtractor = new RegExp(nameFromRelRef)

export {
  including, thrower, stringify,
  tsAny,
  getNameFromRelativeRef
}


function including<T extends Exclude<any, []>>(source: T[]|T, lookup: T) {
  return Array.isArray(source)
  ? source.includes(lookup)
  : source === lookup
}

function thrower(message: string) {
  throw new Error(message)
}

function stringify(v: any) {
  return v === undefined
  ? undefined
  : v === tsAny
  ? tsAny.toString
  : JSON.stringify(v)
}

function getNameFromRelativeRef($ref: string) {
  const $return = $ref.match(nameFromRelRefExtractor)
  return !$return
  ? undefined
  : $return[1]
}