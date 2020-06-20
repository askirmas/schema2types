type Dict = Record<string, any>

type iType<O, Default>
= O extends {type?: any} 
? (
  O["type"] extends "object"
  ? Dict
  : O["type"] extends "array"
  ? Array<any>
  : O["type"] extends "string"
  ? string
  : O["type"] extends "number"
  ? number
  : O["type"] extends "integer"
  ? number
  : O["type"] extends "boolean"
  ? boolean
  : O["type"] extends "null"
  ? null
  : Default
)
: Default

const schema1 = {
  "properties": {
    "children": {
      "additionalProperties": {
        "properties": {
          "children": {
            "type": "string"
          }
        }
      }
    }
  }
} as const
type Sch1 = typeof schema1


type tJSchema<T>
= T extends {properties: Dict, additionalProperties: any}
? {
  [properties: string]: tJSchema<T["properties"][string]> | tJSchema<T["additionalProperties"]>
}
: T extends {properties: Dict}
? {
  [property in keyof T["properties"]]: tJSchema<T["properties"][property]>
}
: T extends {additionalProperties: any}
? {
  [additionalProperty: string]: tJSchema<T["additionalProperties"]>
}

: iType<T, never>


const x1: tJSchema<Sch1> = {
  children: {
    "abc": {
      children: "abc n"
    }
  }
}
