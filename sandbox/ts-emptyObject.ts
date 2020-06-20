type EmptyObject = Record<never, never>
type filterEmptyObject<T> = EmptyObject extends T ? T : never

const v: EmptyObject = {}
, v_false: EmptyObject = {"a": false} as const


const emptyObject = {} as const
, o1 = {"a": false} as const
, v2_: filterEmptyObject<typeof o1> = {}
, v2__: filterEmptyObject<typeof emptyObject> = {}