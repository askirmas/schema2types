export default Schema
export type Schema = Partial<
  iConst & iType & iEnum & iTypeObject
>

export type iConst<V=any> = {
  const: V
}

export type iEnum<V=any> = {
  enum: V[]
}

export type iType<T extends string = string> = {
  type: T[]|T
}

export type iTypeObject = {
  properties: {[property: string]: Schema}
  required: string[]
  // propertyNames
  // additionalProperties
}