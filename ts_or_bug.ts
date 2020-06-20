type tA = {
  a: string
}
type tB = {
  b: number
}

type tUnion = tA | tB

const union: tUnion = {
  a: '',
  b: 0,
}

if ('b' in union)
  // type hint as const union: tB
  if ('a' in union)
    //TSError: Property 'a' does not exist on type 'never'.ts(2339)
    union.a

export {
  union
}