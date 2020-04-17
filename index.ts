import Schema from "./def"

export default schema2ts
export {
  schema2ts
} 

function schema2ts({type}: Schema, name: string) {
  return `export type ${name} = ${
    typeof type === 'string'
    ? type
    : Array.isArray(type)
    ? type.join('|')
    : thrower(`Unknown 'type' shape`)
  }\nexport default ${name}`
}

function thrower(message: string) {
  throw new Error(message)
}