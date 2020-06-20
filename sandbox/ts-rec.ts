type iA = {"a": any}
type iB = {"b": any}

type anyOf2<T1, T2> = T1 & T2 

export type Rec<T>
= T extends  iA | iB | iA & iB 
? anyOf2<
  T extends iA ? {"A": Rec<T["a"]>} : Object,
  T extends iB ? {"B": Rec<T["b"]>} : Object
> : T


const sch = {
  "a": 1,
  "b": false,
  "c": "3"
} as const
, v: Rec<typeof sch> = {
  A: 1,
  B: false
}
