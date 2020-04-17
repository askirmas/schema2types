export {
  including, thrower
}

function including<T extends Exclude<any, []>>(source: T[]|T, lookup: T) {
  return Array.isArray(source)
  ? source.includes(lookup)
  : source === lookup
}

function thrower(message: string) {
  throw new Error(message)
}
