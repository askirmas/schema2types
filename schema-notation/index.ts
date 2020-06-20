import { AnyOf2, AnyOf3, AnyOf4 } from "./logical"

export type SchemaNotation<T>
= T extends false ? never 
: {} extends T ? any
: T extends true ? any
: SchemaNotationStrict<T>


// TODO add T notation
export type SchemaNotationStrict<T>
= (
//TODO Not & due to null & Object === never
  T extends iConst ? ConstSchema<T> : Object
) & (
  T extends iEnum ? EnumSchema<T> : Object
) & (
  T extends iType ? TypeSchema<T> : Object  
//TODO Should be OR
) & (
  T extends iObject ? ObjectSchema<T> : Object
)

const constKey = "const" as const
type iConst = {[constKey]: any}
export type ConstSchema<T extends iConst> = T[typeof constKey]

const enumKey = "enum" as const
type iEnum = {[enumKey]: any[]}
export type EnumSchema<T extends iEnum> = T[typeof enumKey][number]

//TODO null & Object resolves to never 
export type schemaType = "string"|"number"|"integer"|"boolean"|"null" 
type iType = {type: schemaType}
//type iTypes = {type: schemaType[]}


// iTypes
export type TypeSchema<T extends iType>
= T["type"] extends "string" ? string
: T["type"] extends "number" ? number
: T["type"] extends "integer" ? number
: T["type"] extends "boolean" ? boolean
: T["type"] extends "null" ? null
// "array", "object"
: never


type iRequired = {required: string[]}
type iProperties = {properties: {[property: string]: any}}
type iPropertyNames = {propertyNames: any}
type iAdditionalProperties = {additionalProperties: any}

export type RequiredSchema1<T extends iRequired> = Record<T["required"][number], any>
//TODO resolve cycle dependency
export type PropertyNamesSchema<T extends iPropertyNames> = Record<
  Exclude<
    string,
    SchemaNotation<T['propertyNames']>
  >, never
>

type iObjectPA = AnyOf2<iProperties, iAdditionalProperties>

type iObject = AnyOf2<iRequired, iObjectPA>
// propertyNames, patternProperties, additionalProperties
export type ObjectSchema<T extends iObject>
= (
  T extends iRequired ? RequiredSchema1<T> : Object
) & (
  T extends iObjectPA ? PropsAndAdd<T> : Object
// ) & (
//   T extends iPropertyNames ? PropertyNamesSchema<T> : Object
// ) & (
//   T extends iAdditionalProperties ? AdditionalPropertiesSchema<T> : Object
)

export type PropsAndAdd<T>
= T extends iObjectPA
? {
  [property in (
    T extends iProperties ? keyof T['properties']
    : T extends iAdditionalProperties ? T['additionalProperties']
    : never
  )]?: SchemaNotation<
    property extends (
      T extends iProperties ? keyof T['properties'] : never
    ) ? (
      T extends iProperties ? T['properties'][property] : false
    ) : (
      T extends iAdditionalProperties ? T['additionalProperties'] : false
    )
  >
} 
: Object
