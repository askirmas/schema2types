import {anyThing} from './config.json'

const tsAny = {toString: anyThing} as const

export {
  including, thrower, stringify,
  tsAny
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
