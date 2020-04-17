import { including } from "./utils"

type PrimiviteController = Partial<{
  type: string|string[]
  const: any
  enum: any[]
}>

function schemaType(source: any) {
  if (source === null)
    return 'null'
  if (Array.isArray(source))
    return 'array'
  const $typeof = typeof source
  //TODO object: try with $ref: contructor name
  //TODO RegExp - string with format:regexp
  if (!['function', 'symbol'].includes($typeof))
    return $typeof
}

function getNull({type, "enum": en, "const": co}: PrimiviteController) {
  if (
    co === null
    || including(type, "null")
    || en?.includes(null) 
  )
    //TODO 'null' or 'undefined' or 'undefined|null'
    return "null"
}
function getBoolean({type, "enum": en, "const": co}: PrimiviteController) {
  if (
    including(type, "boolean")
  )
    return "boolean"
}
function getNumber({}) {
  
}
function getString() {

}
