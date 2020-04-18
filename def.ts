export default Schema
export type Schema = Partial<
  iConst & iType & iEnum 
>

export type iConst = {
  const: any
}

export type iEnum = {
  enum: any[]
}

export type iType = {
  type: string[]|string
} & iTypeObject & iTypeArray

export type iTypeObject = {
  properties: {[property: string]: Schema}
  required: string[]
  //TODO propertyNames
  //TODO additionalProperties
  //TODO minProperties
  //TODO maxProperties
  //TODO patternProperties
}

export type iTypeArray = {
  items: Schema //TODO Schema[]
  //TODO additionalItems
  //TODO minItems
  //TODO maxItems
}