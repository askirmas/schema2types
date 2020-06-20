export {
  allOf
}

type tAB = {
  a: number
  b: string
  d: null
}
type tAC = {
  a: number
  c: boolean
  d: null
}

const allOf: tAB & tAC = {
  a: 0,
  b: '',
  c: false,
  d: null
}

// ts bug
const anyOf: tAB | tAC = {
  a: 0,
  b: '',
  c: false,
  d: null
}

function fn4oneOf(arg: tAB | tAC) {
  arg.a
  if ('b' in arg) {
    arg.b
    //@ts-ignore 
    arg.c
    if ('c' in arg)
      //@ts-ignore 
      arg.c
  }
}

function fn4allOf(arg: tAB & tAC) {
  arg.a, arg.b, arg.c, arg.d
}

type typeDiff<T1, T2> = {[k in Exclude<keyof T1, keyof T2>]: T1[k] }
const dif: typeDiff<tAB, tAC> = {
  b: 'asd',
  //a: 1
}

// More-like it is some mess
type anyOf1<T1, T2> = Partial<T1 & T2> & (T1 | T2)

function fn4anyOf1(arg: anyOf1<tAB, tAC>) {
  arg.a, arg.d
  if ('b' in arg) {
    arg.b
    arg.c
    if ('c' in arg)
      arg.c
  }
}
