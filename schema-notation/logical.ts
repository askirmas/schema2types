export type AnyOf2<T1,T2> = T1 | T2 | T1 & T2
export type AnyOf3<T1,T2,T3> = AnyOf2<T1, AnyOf2<T2,T3>>
export type AnyOf4<T1,T2,T3,T4> = AnyOf2<T1, AnyOf3<T2,T3,T4>>
export type AnyOf5<T1,T2,T3,T4,T5> = AnyOf2<T1, AnyOf4<T2,T3,T4,T5>>
