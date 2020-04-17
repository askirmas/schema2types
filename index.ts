import Schema from "./def"
import { thrower } from "./utils"

const langOpts = {
  expressionsDelimiter: "\n",
  typesJoin: "|"
}

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

function schema2expr({"const": $c, type}: Schema) {
  if ($c !== undefined)
    return JSON.stringify($c)
  return typeof type === 'string'
  ? type
  : Array.isArray(type)
  ? type.join(langOpts.typesJoin)
  : thrower(`Unknown 'type' shape`)
}