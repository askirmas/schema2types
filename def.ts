export default Schema
export type Schema = Partial<
  iConst & iType & iEnum & iTypeObject
>

export type iConst = {
  const: any
}

export type iEnum = {
  enum: any[]
}

export type iType = {
  type: string[]|string
} & iTypeObject

export type iTypeObject = {
  properties: {[property: string]: Schema}
  required: string[]
  // propertyNames
  // additionalProperties
}