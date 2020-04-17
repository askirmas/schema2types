export {
  including, thrower, stringify
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
  return v === undefined ? undefined : JSON.stringify(v)
}
