export default Schema
export type Schema = Partial<
  iConst & iType & iEnum
>

export type iConst<V=any> = {
  const: V
}

export type iEnum<V=any> = {
  enum: V[]
}

export type iType<T=string> = {
  type: T[]|T
}
